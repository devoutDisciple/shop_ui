/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import CommonHeader from '../component/CommonHeaderNoBack';
import StorageUtil from '../util/Storage';
import Loading from '../component/Loading';
import Request from '../util/Request';
import Order from './order/index';
import Shop from './shop/index';
import SalesReportTotal from './sales/SalesReportTotal';
import { NavigationActions, StackActions } from 'react-navigation';
import { StyleSheet, ScrollView, View, RefreshControl, TouchableOpacity, Text } from 'react-native';

export default class MyScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingVisible: false,
			refreshLoadingVisible: false,
			shopDetail: {},
			orderTotalNum: 0, // 订单总数量
			orderTotalMoney: 0, // 订单总金额
			orderTypeNum: {
				orderType1: 0,
				orderType2: 0,
				orderType3: 0,
				orderType4: 0,
				orderType5: 0,
				orderType6: 0,
				orderType7: 0,
			},
		};
		this.onSearch = this.onSearch.bind(this);
		this.getShopMessage = this.getShopMessage.bind(this);
		this.onJudgeUserLogin = this.onJudgeUserLogin.bind(this);
		this.onSearchShopSalesNum = this.onSearchShopSalesNum.bind(this);
		this.onSearchOrderTypeNum = this.onSearchOrderTypeNum.bind(this);
	}

	async componentDidMount() {
		await this.initSearch();
	}

	async initSearch() {
		await this.setState({ loadingVisible: true });
		await this.onSearch();
		await this.setState({ loadingVisible: false });
	}

	// 下拉刷新
	async onRefresh() {
		this.setState({ refreshLoadingVisible: true });
		await this.onSearch();
		this.setState({ refreshLoadingVisible: false });
	}

	// 查询数据
	async onSearch() {
		// 判断用户是否登录
		let flag = await this.onJudgeUserLogin();
		if (flag === 'success') {
			// 更新商店信息
			await this.getShopMessage();
			// 查询商铺销售量信息
			await this.onSearchShopSalesNum();
			// 查询订单分类数量
			await this.onSearchOrderTypeNum();
		}
	}

	// 判断用户是否登录
	async onJudgeUserLogin() {
		// 判断用户是否登录
		let user = await StorageUtil.get('user');
		let { navigation } = this.props;
		if (!user) {
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
			});
			navigation.dispatch(resetAction);
			return 'error';
		}
		return 'success';
	}

	// 获取商店信息
	async getShopMessage() {
		let user = await StorageUtil.get('user'),
			{ navigation } = this.props;
		let shop = await Request.get('/shop/getShopDetailById', { shopid: user.shopid });
		if (shop && shop.code === 200) {
			await this.setState({ shopDetail: shop.data });
			return StorageUtil.set('shop', shop.data);
		}
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
		});
		navigation.dispatch(resetAction);
	}

	// 查询店铺总销量
	async onSearchShopSalesNum() {
		let { shopDetail } = this.state;
		let res = await Request.get('/order/getAllSalesNum', { shopid: shopDetail.id });
		let { data, code, success } = res;
		if (success && code === 200 && data) {
			this.setState({
				orderTotalNum: data.orderTotalNum || 0,
				orderTotalMoney: data.orderTotalMoney || 0,
			});
		}
	}

	// 查询订单分类数量
	async onSearchOrderTypeNum() {
		let { shopDetail } = this.state;
		let res = await Request.get('/order/getAllOrderNumByType', { shopid: shopDetail.id });
		let { data, code, success } = res;
		if (success && code === 200 && data) {
			this.setState({ orderTypeNum: data });
		}
	}

	// // 获取storage
	// async onGetStorage() {
	// 	let keys = await StorageUtil.getAllKeys();
	// 	let res = await StorageUtil.multiGet(keys);
	// 	console.log('StorageUtil: ', res);
	// }

	// onClearStorage() {
	// 	StorageUtil.clear();
	// }

	render() {
		const { navigation } = this.props,
			{
				loadingVisible,
				shopDetail,
				orderTotalNum,
				orderTotalMoney,
				orderTypeNum,
				refreshLoadingVisible,
			} = this.state;
		return (
			<View style={styles.container}>
				<CommonHeader title={`${shopDetail.name || 'MOVING'}后台管理系统`} navigation={navigation} />
				{/* <TouchableOpacity onPress={this.onGetStorage.bind(this)}>
					<Text>获取storage</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.onClearStorage.bind(this)}>
					<Text>清除storage</Text>
				</TouchableOpacity> */}
				<ScrollView
					style={styles.view_container}
					refreshControl={
						<RefreshControl refreshing={refreshLoadingVisible} onRefresh={this.onRefresh.bind(this)} />
					}
				>
					<SalesReportTotal orderTotalNum={orderTotalNum} orderTotalMoney={orderTotalMoney} />
					<Order orderTypeNum={orderTypeNum} navigation={navigation} />
					<Shop navigation={navigation} />
				</ScrollView>
				<Loading visible={loadingVisible} />
			</View>
		);
	}
}

// 展示头像的view高度
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	view_container: {
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	shop_manager: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
