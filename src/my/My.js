/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import My_Header from './Header';
import My_Wallert from './Wallet';
import ListItem from './ListItem';
import Icon from 'react-native-vector-icons/AntDesign';
import StorageUtil from '../util/Storage';
import Loading from '../component/Loading';
import Request from '../util/Request';
import NavigationUtil from '../util/NavigationUtil';
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import NotifService from '../notifService/index';

export default class MyScreen extends React.Component {
	static navigationOptions = ({ navigation, navigationOptions }) => {
		return {
			headerTitle: '',
			headerRight: () => {
				return (
					<TouchableOpacity onPress={() => navigation.state.params.rightIconClick()}>
						<Icon
							style={{ width: 20, marginTop: 3, marginRight: 3 }}
							name="setting"
							size={20}
							color="#333"
						/>
					</TouchableOpacity>
				);
			},
			headerStyle: {
				borderWidth: 0,
				borderBottomColor: '#fff',
			},
		};
	};

	constructor(props) {
		super(props);
		this.state = {
			loadingVisible: false,
			shopDetail: {},
			userDetail: {},
			orderTotalNum: 0,
			orderTotalMoney: 0,
		};
		this.notif = new NotifService();
	}

	async componentDidMount() {
		const { setParams } = this.props.navigation;
		setParams({
			rightIconClick: () => this.setIconClick(),
		});
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

	// 点击设置按钮
	setIconClick() {
		this.props.navigation.navigate('MySetting');
	}

	// 点击销售统计
	sendLocalMessage() {
		this.notif.localNotif('moving洗衣店', '消息通知内容');
	}

	render() {
		let { shopDetail, userDetail, loadingVisible, orderTotalNum, orderTotalMoney } = this.state;
		return (
			<View style={styles.container}>
				<ScrollView style={styles.container}>
					<My_Header navigation={this.props.navigation} shopDetail={shopDetail} userDetail={userDetail} />
					<My_Wallert
						navigation={this.props.navigation}
						orderTotalNum={orderTotalNum}
						orderTotalMoney={orderTotalMoney}
					/>
					<ListItem iconName="creditcard" text="销售额统计" />
					{/* <ListItem iconName="creditcard" text="发送消息通知" onPress={this.sendLocalMessage.bind(this)} /> */}
					<ListItem iconName="creditcard" text="销售量统计" />
					<ListItem iconName="creditcard" text="会员消费报表" />
					<ListItem iconName="creditcard" text="积分兑换记录" />
					<ListItem iconName="creditcard" text="钱包管理" />
					<ListItem iconName="creditcard" text="修改店铺信息" />
					<ListItem iconName="creditcard" text="客户意见反馈" />
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
		padding: 10,
	},
});
