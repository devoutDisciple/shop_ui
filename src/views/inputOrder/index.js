import React from 'react';
import MessageItem from './MessageItem';
import Request from '@/util/Request';
import Toast from '@/component/Toast';
import StorageUtil from '@/util/Storage';
import Dialog from '@/component/Dialog';
import Loading from '@/component/Loading';
import Message from '@/component/Message';
import NavigationUtil from '@/util/NavigationUtil';
import CommonHeader from '@/component/CommonHeader';
import SafeViewComponent from '@/component/SafeViewComponent';
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
			urgency: 1,
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

	// 改变加急状态
	changeUrgency(value) {
		if (value === 1) {
			Message.warning('普通订单', '店员将会在一至三日内取货，请耐心等待');
		}
		if (value === 2) {
			Message.warning('加急订单', '店员将会在当日收取衣物，另外收取衣物总费用的50%作为加急费用');
		}
		this.setState({ urgency: value });
	}

	// 确认订单
	async onSureOrder() {
		// let keys = await StorageUtil.getAllKeys();
		// let res = await StorageUtil.multiGet(keys);
		// console.log('StorageUtil: ', res);
		try {
			let user = await StorageUtil.get('user');
			let shop = await StorageUtil.get('shop');
			let { orderDetail, urgency } = this.state;
			let { navigation } = this.props;
			if (!orderDetail.name || !orderDetail.phone || !orderDetail.address) {
				return Toast.warning('请完善信息');
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
				urgency: urgency,
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
			{ visible, orderDetail, changeKey, title, defalutValue, loadingVisible, urgency } = this.state;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader
						title="订单录入"
						navigation={navigation}
						back={() => NavigationUtil.reset(navigation, 'HomeScreen')}
					/>
					<ScrollView style={styles.setting_content} showsVerticalScrollIndicator={false}>
						<MessageItem
							showIcon
							label="用户名称"
							value={orderDetail.name}
							onPress={() => {
								this.setState(
									{ changeKey: 'name', title: '用户名称', defalutValue: orderDetail.name },
									() => {
										this.setState({ visible: true });
									},
								);
							}}
						/>
						<MessageItem
							showIcon
							label="用户电话"
							value={orderDetail.phone}
							onPress={() => {
								this.setState(
									{ changeKey: 'phone', title: '用户电话', defalutValue: orderDetail.phone },
									() => {
										this.setState({ visible: true });
									},
								);
							}}
						/>
						<MessageItem
							showIcon
							label="用户地址"
							value={orderDetail.address}
							onPress={() => {
								this.setState(
									{ changeKey: 'address', title: '用户地址', defalutValue: orderDetail.address },
									() => {
										this.setState({ visible: true });
									},
								);
							}}
						/>
						<MessageItem
							label="是否加急"
							isSwitch
							value={
								<View style={styles.sex_container}>
									<TouchableOpacity onPress={this.changeUrgency.bind(this, 2)}>
										<Text style={urgency === 2 ? styles.sex_item_active : styles.sex_item_normal}>
											是
										</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={this.changeUrgency.bind(this, 1)}>
										<Text style={urgency === 1 ? styles.sex_item_active : styles.sex_item_normal}>
											否
										</Text>
									</TouchableOpacity>
								</View>
							}
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
