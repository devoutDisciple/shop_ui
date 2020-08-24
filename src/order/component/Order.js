import React from 'react';
import Empty from './Empty';
import FooterScreen from './Footer';
import Request from '../../util/Request';
import storageUtil from '../../util/Storage';
import Loading from '../../component/Loading';
import OrderItemByHome from './OrderItemByHome';
import OrderItemByCabinet from './OrderItemByCabinet';
import OrderItemByIntergral from './OrderItemByIntergral';
import OrderItemByShoperInput from './OrderItemByShoperInput';
import { View, FlatList, StyleSheet } from 'react-native';
import OrderItemByUserInShop from './OrderItemByUserInShop';

export default class AllOrder extends React.Component {
	constructor(props) {
		super(props);
		let { type, status } = props;
		this.state = {
			data: [],
			current: 1,
			type: type, // all-全部 cleaning-清洗中 receiving-待取货 finished-已完成
			status: status, // 订单状态 1-存储在柜子 2-店员取货，清洗中 3-待付款 4-待取货 5-已完成 6-预约上门等待店员取货 7-积分兑换
			pagesize: 10,
			headerLoading: false, // 头部的loading是否显示
			loadingVisible: false,
			footerStatus: 1, // 底部的状态 1-什么也不显示 2-上拉加载 3-加载中 4-已经全部加载完成
		};
	}

	async componentDidMount() {
		await this.onJustSearch();
	}

	// 当参数含有flash的时候会进行刷新
	async UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.navigation && nextProps.navigation.state.params.flash) {
			await this.onJustSearch();
		}
	}

	async onJustSearch() {
		let data = await this.onSearchOrder(true);
		this.setState({ data });
	}

	async onSearchOrder(show) {
		show && (await this.setState({ loadingVisible: true }));
		let shop = await storageUtil.get('shop');
		let shopid = shop.id,
			{ current, pagesize, type, status } = this.state;
		let result = await Request.get('/order/getOrderByShopidAndPage', { current, pagesize, shopid, type, status });
		let data = result.data || [];
		show && (await this.setState({ loadingVisible: false }));
		return data;
	}

	// 下拉刷新
	headerRefresh() {
		this.setState({ headerLoading: true, current: 1 }, async () => {
			let orders = await this.onSearchOrder(false);
			this.setState({ headerLoading: false, data: orders, footerStatus: 2, current: 1 });
		});
	}

	// 上拉加载更多
	footerRefresh() {
		let { footerStatus, data, current, pagesize } = this.state;
		if (current * pagesize > data.length) {
			return;
		}
		if (footerStatus !== 3) {
			this.setState({ footerStatus: 3, current: current + 1 }, async () => {
				let orders = await this.onSearchOrder(false);
				let result = data.concat(orders || []);
				this.setState({ footerStatus: 4, data: result });
			});
		}
	}

	render() {
		let { navigation } = this.props;
		let { data, headerLoading, footerStatus, loadingVisible } = this.state;
		return (
			<View style={styles.order_container}>
				<FlatList
					data={data}
					onRefresh={this.headerRefresh.bind(this)}
					refreshing={headerLoading}
					onEndReachedThreshold={0.1} // 决定当距离内容最底部还有多远时触发onEndReached回调
					onEndReached={this.footerRefresh.bind(this)}
					ListEmptyComponent={<Empty />}
					keyExtractor={(item, index) => String(item.id)}
					ListFooterComponent={<FooterScreen status={footerStatus} />}
					renderItem={({ item, index }) => {
						if (item.order_type === 1 || item.order_type === 2 || item.order_type === 5) {
							let goods = '',
								firstName = '--',
								totalThings = 0;
							goods = JSON.parse(item.goods || []);
							firstName = goods[0] ? goods[0].name : '--';
							totalThings = 0;
							if (goods.length !== 0) {
								goods.forEach(good => {
									totalThings += Number(good.num);
								});
							}
							// 通过快递柜下单
							if (item.order_type === 1) {
								return (
									<OrderItemByCabinet
										detail={item}
										key={String(item.id)}
										navigation={navigation}
										onSearch={this.headerRefresh.bind(this)}
										goods={`${firstName} 等 ${totalThings} 件衣物`}
										setLoading={flag => this.setState({ loadingVisible: flag })}
									/>
								);
							}
							// 预约上门取衣
							if (item.order_type === 2) {
								return (
									<OrderItemByHome
										detail={item}
										key={String(item.id)}
										navigation={navigation}
										onSearch={this.headerRefresh.bind(this)}
										goods={`${firstName} 等 ${totalThings} 件衣物`}
										setLoading={flag => this.setState({ loadingVisible: flag })}
									/>
								);
							}
							// 店内下单
							if (item.order_type === 5) {
								return (
									<OrderItemByUserInShop
										detail={item}
										key={String(item.id)}
										navigation={navigation}
										setLoading={flag => this.setState({ loadingVisible: flag })}
										onSearch={this.headerRefresh.bind(this)}
										goods={`${firstName} 等 ${totalThings} 件衣物`}
									/>
								);
							}
						}

						// 积分兑换
						if (item.order_type === 3) {
							return (
								<OrderItemByIntergral
									detail={item}
									key={String(item.id)}
									navigation={navigation}
									onSearch={this.headerRefresh.bind(this)}
									setLoading={flag => this.setState({ loadingVisible: flag })}
								/>
							);
						}
						// 店员录入订单
						if (item.order_type === 4) {
							return (
								<OrderItemByShoperInput
									detail={item}
									key={String(item.id)}
									navigation={navigation}
									onSearch={this.headerRefresh.bind(this)}
									setLoading={flag => this.setState({ loadingVisible: flag })}
								/>
							);
						}
					}}
				/>
				<Loading visible={loadingVisible} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	order_container: {
		flex: 1,
		backgroundColor: '#fafafa',
	},
});
