/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import My_Header from './Header';
import My_Wallert from './Wallet';
import ListItem from './ListItem';
import StorageUtil from '../util/Storage';
import Loading from '../component/Loading';
import Request from '../util/Request';
import NavigationUtil from '../util/NavigationUtil';
import Message from '../component/Message';
import SafeViewComponent from '../component/SafeViewComponent';
import { StyleSheet, ScrollView, View, RefreshControl } from 'react-native';

export default class MyScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingVisible: false,
			shopDetail: {},
			userDetail: {},
			orderTotalNum: 0,
			orderTotalMoney: 0,
			headerLoading: false,
		};
	}

	async componentDidMount() {
		await this.initSearch();
	}

	async initSearch() {
		try {
			this.setState({ loadingVisible: true });
			await this.onSearch();
			this.setState({ loadingVisible: false });
		} catch (error) {
			this.setState({ loadingVisible: false });
		} finally {
			this.setState({ loadingVisible: false });
		}
	}

	async refreshing() {
		try {
			this.setState({ headerLoading: true });
			await this.onSearch();
			this.setState({ headerLoading: false });
		} catch (error) {
			this.setState({ headerLoading: false });
		} finally {
			this.setState({ headerLoading: false });
		}
	}

	// 查询数据
	async onSearch() {
		// 判断用户是否登录
		let flag = await this.onJudgeUserLogin();
		if (flag === 'success') {
			// 更新商店信息
			await this.getShopMessage();
			// // 查询商铺销售量信息
			await this.onSearchShopSalesNum();
		}
	}

	// 判断用户是否登录
	async onJudgeUserLogin() {
		try {
			// 判断用户是否登录
			let user = await StorageUtil.get('user');
			let { navigation } = this.props;
			if (!user) {
				NavigationUtil.reset(navigation, 'LoginScreen');
				return 'error';
			}
			this.setState({ userDetail: user });
			return 'success';
		} catch (error) {
			this.setState({ loadingVisible: false });
		}
	}

	// 获取商店信息
	async getShopMessage() {
		try {
			let user = await StorageUtil.get('user'),
				{ navigation } = this.props;
			if (!user) {
				return NavigationUtil.reset(navigation, 'LoginScreen');
			}
			let shop = await Request.get('/shop/getShopDetailById', { shopid: user.shopid });
			if (shop && shop.code === 200) {
				await this.setState({ shopDetail: shop.data });
				return StorageUtil.set('shop', shop.data);
			}
			NavigationUtil.reset(navigation, 'LoginScreen');
		} catch (error) {
			this.setState({ loadingVisible: false });
		}
	}

	// 查询店铺总销量
	async onSearchShopSalesNum() {
		try {
			let { shopDetail } = this.state;
			let res = await Request.get('/order/getAllSalesNum', { shopid: shopDetail.id });
			let { data, code, success } = res;
			if (success && code === 200 && data) {
				this.setState({
					orderTotalNum: data.orderTotalNum || 0,
					orderTotalMoney: data.totalMoney || 0,
				});
			}
		} catch (error) {
			this.setState({ loadingVisible: false });
		}
	}

	async pressList(type) {
		let { navigation } = this.props;
		// 营销总览
		if (type === 'SalesTypeScreen') {
			navigation.navigate('SalesTypeScreen');
		}
		// 订单概况
		if (type === 'orderOverviewScreen') {
			navigation.navigate('orderOverviewScreen');
		}
		// 店铺设置
		if (type === 'ShopDetailScreen') {
			navigation.navigate('ShopDetailScreen');
		}
		//  洗衣柜状态
		if (type === 'CabinetScreen') {
			navigation.navigate('CabinetScreen');
		}
		// 衣物管理
		if (type === 'ClothingScreen') {
			navigation.navigate('ClothingScreen');
		}
		// 退出登录
		if (type === 'logout') {
			Message.confirm('提示', '确定退出登录', async () => {
				await StorageUtil.clear();
				NavigationUtil.reset(navigation, 'HomeScreen');
			});
		}
	}

	// 点击设置按钮
	setIconClick() {
		this.props.navigation.navigate('MySetting');
	}

	render() {
		let { shopDetail, userDetail, loadingVisible, orderTotalNum, orderTotalMoney, headerLoading } = this.state;
		return (
			<SafeViewComponent>
				<View style={styles.con}>
					<ScrollView
						style={styles.container}
						howsVerticalScrollIndicator={false}
						refreshControl={
							<RefreshControl refreshing={headerLoading} onRefresh={this.refreshing.bind(this)} />
						}
					>
						<My_Header navigation={this.props.navigation} shopDetail={shopDetail} userDetail={userDetail} />
						<My_Wallert
							navigation={this.props.navigation}
							orderTotalNum={orderTotalNum}
							orderTotalMoney={orderTotalMoney}
						/>
						{/* <ListItem
							iconName="linechart"
							text="营销总览"
							onPress={this.pressList.bind(this, 'SalesTypeScreen')}
						/>
						<ListItem
							iconName="profile"
							text="订单概况"
							onPress={this.pressList.bind(this, 'orderOverviewScreen')}
						/> */}
						<ListItem
							iconName="setting"
							text="店铺设置"
							onPress={this.pressList.bind(this, 'ShopDetailScreen')}
						/>
						<ListItem
							iconName="videocamera"
							text="洗衣柜状态"
							onPress={this.pressList.bind(this, 'CabinetScreen')}
						/>
						<ListItem
							iconName="skin"
							text="衣物管理"
							onPress={this.pressList.bind(this, 'ClothingScreen')}
						/>
						<ListItem iconName="logout" text="退出登录" onPress={this.pressList.bind(this, 'logout')} />
					</ScrollView>
					<Loading visible={loadingVisible} />
				</View>
			</SafeViewComponent>
		);
	}
}
// 展示头像的view高度
const styles = StyleSheet.create({
	con: {
		flex: 1,
		marginTop: 60,
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 10,
	},
});
