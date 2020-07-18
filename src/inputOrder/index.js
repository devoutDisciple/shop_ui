import React from 'react';
import MessageItem from './MessageItem';
import Request from '../util/Request';
import Toast from '../component/Toast';
import StorageUtil from '../util/Storage';
import Dialog from '../component/Dialog';
import Loading from '../component/Loading';
import Message from '../component/Message';
import NavigationUtil from '../util/NavigationUtil';
import CommonHeader from '../component/CommonHeader';
import SafeViewComponent from '../component/SafeViewComponent';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native';
const { width } = Dimensions.get('window');

export default class SettingScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orderDetail: {},
			visible: false,
			user: {},
			defalutValue: '',
			title: '',
			changeKey: '',
			loadingVisible: false,
		};
	}

	async componentDidMount() {}

	// 弹框确定的时候
	onOkDialog(key, value) {
		if (key === 'phone') {
			// 手机号不通过
			if (!/^1[3456789]\d{9}$/.test(value)) {
				return Message.warning('提示', '请输入正确的手机号码');
			}
		}
		this.setState({ visible: false });
		let params = this.state.orderDetail;
		params[key] = value;
		this.setState({ orderDetail: params });
	}

	// 确认订单
	async onSureOrder() {
		// let keys = await StorageUtil.getAllKeys();
		// let res = await StorageUtil.multiGet(keys);
		// console.log('StorageUtil: ', res);
		try {
			let user = await StorageUtil.get('user');
			let shop = await StorageUtil.get('shop');
			let { orderDetail } = this.state;
			let { navigation } = this.props;
			if (!orderDetail.name || !orderDetail.phone || !orderDetail.address || !orderDetail.money) {
				return Toast.warning('请完善信息');
			}
			console.log(orderDetail.money, 111);
			console.log(typeof orderDetail.money);
			if (typeof orderDetail.money !== 'number' || orderDetail.money < 0) {
				return Toast.warning('请输入正确清洗费用');
			}
			if (!/^1[3456789]\d{9}$/.test(orderDetail.phone)) {
				return Toast.warning('请输入正确的手机号码');
			}
			this.setState({ loadingVisible: true });
			let result = await Request.post('/order/addOrderByShoper', {
				shopid: shop.id,
				home_username: orderDetail.name,
				home_phone: orderDetail.phone,
				home_address: orderDetail.address,
				desc: orderDetail.desc,
				money: orderDetail.money,
				userid: user.id, // 是谁录入的
				is_sure: 2,
			});
			this.setState({ loadingVisible: false });
			if (result.data === 'success') {
				Message.success('录入成功', '订单将被归类于清洗中订单', () => {
					NavigationUtil.reset(navigation, 'HomeScreen');
				});
			}
		} catch (error) {
			this.setState({ loadingVisible: false });
		}
	}

	render() {
		const { navigation } = this.props,
			{ visible, orderDetail, changeKey, title, defalutValue, loadingVisible } = this.state;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader
						title="订单录入"
						navigation={navigation}
						back={() => NavigationUtil.reset(navigation, 'HomeScreen')}
					/>
					<ScrollView style={styles.setting_content}>
						<MessageItem
							showIcon
							label="客户名称"
							value={orderDetail.name}
							onPress={() => {
								this.setState(
									{ changeKey: 'name', title: '客户名称', defalutValue: orderDetail.name },
									() => {
										this.setState({ visible: true });
									},
								);
							}}
						/>
						<MessageItem
							showIcon
							label="客户电话"
							value={orderDetail.phone}
							onPress={() => {
								this.setState(
									{ changeKey: 'phone', title: '客户电话', defalutValue: orderDetail.phone },
									() => {
										this.setState({ visible: true });
									},
								);
							}}
						/>
						<MessageItem
							showIcon
							label="客户地址"
							value={orderDetail.address}
							onPress={() => {
								this.setState(
									{ changeKey: 'address', title: '客户地址', defalutValue: orderDetail.address },
									() => {
										this.setState({ visible: true });
									},
								);
							}}
						/>
						<MessageItem
							showIcon
							label="清洗费用"
							value={orderDetail.money}
							onPress={() => {
								this.setState(
									{ changeKey: 'money', title: '清洗费用', defalutValue: orderDetail.money },
									() => {
										this.setState({ visible: true });
									},
								);
							}}
						/>
						<MessageItem
							showIcon
							label="备注信息"
							value={orderDetail.desc}
							onPress={() => {
								this.setState(
									{ changeKey: 'desc', title: '备注信息', defalutValue: orderDetail.desc },
									() => {
										this.setState({ visible: true });
									},
								);
							}}
						/>
					</ScrollView>
					<TouchableOpacity style={styles.bottom_btn} onPress={this.onSureOrder.bind(this)}>
						<Text style={styles.bottom_btn_text}>确定</Text>
					</TouchableOpacity>
					{visible && (
						<Dialog
							title={title}
							maxLength={40}
							changeKey={changeKey}
							defalutValue={defalutValue}
							onOk={this.onOkDialog.bind(this)}
							onCancel={() => this.setState({ visible: false })}
						/>
					)}
					<Loading visible={loadingVisible} />
				</View>
			</SafeViewComponent>
		);
	}
}

const sex_common = {
	marginLeft: 20,
	borderWidth: 1,
	paddingHorizontal: 20,
	paddingVertical: 5,
	borderRadius: 13,
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	common_text_style: {
		fontSize: 16,
		color: '#333',
	},
	sex_container: {
		flexDirection: 'row',
	},
	sex_item_active: {
		...sex_common,
		borderColor: '#fb9cce',
		color: '#fb9cce',
	},
	sex_item_normal: {
		...sex_common,
		borderColor: '#e5e5e5',
		color: '#333',
	},
	setting_content: {
		flex: 1,
		marginTop: 10,
	},
	setting_content_item: {
		marginHorizontal: 10,
		height: 50,
		borderBottomColor: '#f1f1f1',
		borderBottomWidth: 0.5,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	setting_content_item_left: {
		width: 100,
		// backgroundColor: 'red',
		justifyContent: 'center',
	},
	setting_content_item_center: {
		flex: 1,
		// backgroundColor: 'blue',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	setting_content_item_center_img: {
		width: 40,
		height: 40,
		borderRadius: 50,
	},
	setting_content_item_right: {
		width: 30,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	bottom_btn: {
		height: 50,
		width: width - 40,
		marginLeft: 20,
		backgroundColor: '#fb9dd0',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
		borderRadius: 50,
	},
	bottom_btn_text: {
		fontSize: 18,
		color: '#fff',
		fontWeight: '800',
	},
});
