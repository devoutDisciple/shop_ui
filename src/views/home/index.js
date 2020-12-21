import React from 'react';
import Shop from './shop/index';
import Order from './order/index';
import config from '@/config/config';
import Request from '@/util/Request';
import StorageUtil from '@/util/Storage';
import Loading from '@/component/Loading';
import updateVersion from '@/util/Update';
import NavigationUtil from '@/util/NavigationUtil';
import VersionDialog from '@/component/VersionDialog';
import CommonHeader from '@/component/CommonHeaderNoBack';
import SafeViewComponent from '@/component/SafeViewComponent';
import { StyleSheet, ScrollView, View, RefreshControl } from 'react-native';

export default class MyScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingVisible: false,
			refreshLoadingVisible: false,
			versionSoftDialogVisible: false, // 非强制更新
			versionForceDialogVisible: false, // 强制更新
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
				orderType9: 0,
			},
		};
	}

	async componentDidMount() {
		await this.getVersion();
		await this.initSearch();
	}

	// 获取当前版本
	async getVersion() {
		let res = await Request.get('/version/getCurrentVersion');
		let versionDetail = res.data;
		if (!versionDetail.version.includes(config.currentVersion)) {
			if (versionDetail.force === 1) {
				this.setState({
					versionSoftDialogVisible: true,
				});
			}
			if (versionDetail.force === 2) {
				this.setState({
					versionForceDialogVisible: true,
				});
			}
		}
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

	// 查询数据
	async onSearch() {
		// 判断用户是否登录
		let flag = await this.onJudgeUserLogin();
		if (flag === 'success') {
			// 更新商店信息
			await this.getShopMessage();
			// 查询订单分类数量
			await this.onSearchOrderTypeNum();
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

	// 查询订单分类数量
	async onSearchOrderTypeNum() {
		try {
			let { shopDetail } = this.state;
			let res = await Request.get('/order/getAllOrderNumByType', { shopid: shopDetail.id });
			let { data, code, success } = res;
			if (success && code === 200 && data) {
				this.setState({ orderTypeNum: data });
			}
		} catch (error) {
			this.setState({ loadingVisible: false });
		}
	}

	// 获取storage
	async onGetStorage() {
		let keys = await StorageUtil.getAllKeys();
		let res = await StorageUtil.multiGet(keys);
		console.log('StorageUtil: ', res);
	}

	// 跳转到appstore进行更新
	goAppStore() {
		updateVersion.updateVersion();
	}

	onClearStorage() {
		StorageUtil.clear();
	}

	render() {
		const { navigation } = this.props,
			{
				loadingVisible,
				shopDetail,
				orderTypeNum,
				refreshLoadingVisible,
				versionSoftDialogVisible,
				versionForceDialogVisible,
			} = this.state;
		return (
			<SafeViewComponent style={styles.container}>
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
						showsVerticalScrollIndicator={false}
						refreshControl={
							<RefreshControl refreshing={refreshLoadingVisible} onRefresh={this.initSearch.bind(this)} />
						}
					>
						{/* <SalesReportTotal orderTotalNum={orderTotalNum} orderTotalMoney={orderTotalMoney} /> */}
						<Order orderTypeNum={orderTypeNum} navigation={navigation} />
						<Shop navigation={navigation} />
					</ScrollView>
					<Loading visible={loadingVisible} />
					{/* 非强制版本 */}
					{versionSoftDialogVisible && (
						<VersionDialog
							title="版本更新"
							okText="立即更新"
							cancelText="取消更新"
							desc="有新版本更新,请更新至最新版本"
							onOk={this.goAppStore.bind(this)}
							onCancel={() => {
								this.setState({ versionSoftDialogVisible: false });
							}}
							cancelShow={true}
						/>
					)}
					{/* 强制更新版本 */}
					{versionForceDialogVisible && (
						<VersionDialog
							title="版本更新"
							okText="立即更新"
							desc="有新版本更新,请立即更新至最新版本"
							onOk={this.goAppStore.bind(this)}
							onCancel={() => {}}
							cancelShow={false}
						/>
					)}
				</View>
			</SafeViewComponent>
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
