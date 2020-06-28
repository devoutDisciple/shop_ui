/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import CommonHeader from '../component/CommonHeaderNoBack';
import StorageUtil from '../util/Storage';
import Loading from '../component/Loading';
import Request from '../util/Request';
import Order from './order/index';
import Shop from './shop/index';
import SalesReportTotal from './sales/SalesReportTotal';

export default class MyScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingVisible: false,
			shopDetail: {},
		};
		this.onJudgeUserLogin = this.onJudgeUserLogin.bind(this);
		this.getShopMessage = this.getShopMessage.bind(this);
	}

	async componentDidMount() {
		// 判断用户是否登录
		await this.onJudgeUserLogin();
		// 更新商店信息
		await this.getShopMessage();
	}

	// 获取商店信息
	async getShopMessage() {
		let user = await StorageUtil.get('user');
		let shop = await Request.get('/shop/getShopDetailById', { shopid: user.shopid });
		console.log(shop);
		if (shop && shop.code === 200) {
			this.setState({ shopDetail: shop.data });
			return StorageUtil.set('shop', shop.data);
		}
		this.props.navigation.navigate('LoginScreen');
	}

	// 判断用户是否登录
	async onJudgeUserLogin() {
		this.setState({ loadingVisible: true });
		// 判断用户是否登录
		let user = await StorageUtil.get('user');
		this.setState({ loadingVisible: false });
		if (!user) {
			return this.props.navigation.navigate('LoginScreen');
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
			{ loadingVisible, shopDetail } = this.state;
		return (
			<View style={styles.container}>
				<CommonHeader title={`${shopDetail.name || 'MOVING'}后台管理系统`} navigation={navigation} />
				{/* <TouchableOpacity onPress={this.onGetStorage.bind(this)}>
					<Text>获取storage</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.onClearStorage.bind(this)}>
					<Text>清除storage</Text>
				</TouchableOpacity> */}
				<ScrollView style={styles.view_container}>
					<SalesReportTotal />
					<Order />
					<Shop />
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
