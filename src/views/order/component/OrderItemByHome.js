import React from 'react';
import MoneyItem from './MoneyItem';
import Request from '@/util/Request';
import Config from '@/config/config';
import Toast from '@/component/Toast';
import { Badge } from 'react-native-elements';
import Message from '@/component/Message';
import FastImage from '@/component/FastImage';
import FilterStatus from '@/util/FilterStatus';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default class AllOrder extends React.Component {
	constructor(props) {
		super(props);
		this.renderBtn = this.renderBtn.bind(this);
	}

	componentDidMount() {}

	// 更新衣物状态
	async updateOrderStatus(status) {
		let { id } = this.props.detail;
		let orderStatus = await Request.post('/order/updateOrderStatus', { orderid: id, status: status });
		if (orderStatus.data === 'success') {
			return this.props.onSearch();
		}
		return;
	}

	// 联系用户
	async onConnectUs() {
		let { detail } = this.props;
		let res = await Request.get('/order/getOrderById', { id: detail.id });
		let phone = res.data && res.data.userDetail ? res.data.userDetail.phone : '18210619398';
		let tel = `tel:${phone}`; // 目标电话
		Linking.canOpenURL(tel)
			.then(supported => {
				if (!supported) {
					Message.warning('用户电话', phone);
				} else {
					return Linking.openURL(tel);
				}
			})
			.catch(error => Message.warning('用户电话', phone));
	}

	// 点击查看详情页面
	onSearchDetail(id) {
		const { navigation } = this.props;
		navigation.navigate('OrderDetailScreen', {
			id: id,
		});
	}

	// 已取到衣物
	getClothing() {
		Message.confirm('确认已取到衣物', '确认后衣物将归类于清洗中订单', async () => {
			this.props.setLoading(true);
			await this.updateOrderStatus(2);
			this.props.setLoading(false);
			Toast.success('已取到衣物');
			this.props.onSearch();
		});
	}

	// 完成派送，送到了用户手中
	successSendByHomeOrder() {
		Message.confirm('已完成派送', '已完成派送，订单将归类于用户待收取订单', async () => {
			this.props.setLoading(true);
			let { id } = this.props.detail;
			let orderStatus = await Request.post('/order/successSendByHomeOrder', { orderid: id });
			this.props.setLoading(false);
			this.props.onSearch();
			if (orderStatus.data === 'success') {
				Toast.success('已完成清洗');
			}
		});
	}

	renderBtn() {
		let actionBtn = [],
			detail = this.props.detail || {};
		let { status, id, is_sure } = detail;

		// 联系用户
		const connectBtn = (
			<TouchableOpacity
				key="connectBtn"
				onPress={this.onConnectUs.bind(this)}
				style={styles.order_item_right_bottom_btn}
			>
				<Text style={styles.order_pay_font}>联系用户</Text>
			</TouchableOpacity>
		);

		// 设置金额
		const setMoney = (
			<TouchableOpacity
				key="setMoney"
				style={styles.order_item_right_bottom_btn}
				onPress={() => this.props.navigation.navigate('GoodsScreen', { orderId: id })}
			>
				<Text style={styles.order_pay_font}>设置金额</Text>
			</TouchableOpacity>
		);

		// 确认取到衣物
		const sureGetClothing = (
			<TouchableOpacity
				key="sureGetClothing"
				style={styles.order_item_right_bottom_btn}
				onPress={this.getClothing.bind(this)}
			>
				<Text style={styles.order_pay_font}>确认取到衣物</Text>
			</TouchableOpacity>
		);

		// 存放衣物
		const saveClothingBtn = (
			<TouchableOpacity
				key="saveClothingBtn"
				style={styles.order_item_right_bottom_btn}
				onPress={() => this.props.navigation.navigate('CabinetScreen', { orderId: id, showCabinetBtn: true })}
			>
				<Text style={styles.order_pay_font}>存放衣物</Text>
			</TouchableOpacity>
		);

		// 已完成派送
		const sendSuccessBtn = (
			<TouchableOpacity
				key="sendSuccessBtn"
				style={styles.order_item_right_bottom_btn}
				onPress={this.successSendByHomeOrder.bind(this)}
			>
				<Text style={styles.order_pay_font}>完成派送</Text>
			</TouchableOpacity>
		);

		if (Number(status) === 6) {
			actionBtn = [connectBtn];
		}
		if (Number(status) === 8) {
			actionBtn = [connectBtn, sureGetClothing];
		}
		if (status === 2) {
			actionBtn = [connectBtn, setMoney];
			if (is_sure === 2) {
				actionBtn.push(saveClothingBtn);
				actionBtn.push(sendSuccessBtn);
			}
		}
		if (status === 3) {
			actionBtn = [connectBtn];
		}
		if (status === 4) {
			actionBtn = [connectBtn];
		}
		if (status === 5) {
			actionBtn = [connectBtn];
		}
		return actionBtn;
	}

	render() {
		let { detail, goods } = this.props;
		const { id, create_time, status, code, home_time, urgency, cabinetAdderss, cabinetName, is_sure } = detail;
		return (
			<View style={styles.order_item}>
				<View style={styles.order_item_left}>
					<FastImage
						style={styles.order_item_left_img}
						source={{ uri: `${Config.baseUrl}/logo_square.jpg` }}
					/>
				</View>
				<View style={styles.order_item_right}>
					<View style={styles.order_item_right_title}>
						<View style={styles.order_item_right_title_left}>
							<Text style={styles.font_title_style}>{code}</Text>
						</View>
						<View style={styles.order_item_right_title_right}>
							<Text style={styles.font_title_style}>{FilterStatus.filterOrderStatus(status)}</Text>
						</View>
					</View>
					<View style={styles.order_item_right_time}>
						<View style={styles.order_item_right_time_left}>
							<Text style={{ fontSize: 10, color: '#333' }}>{create_time}</Text>
						</View>
						{Number(urgency) === 2 && (
							<View style={styles.order_item_right_time_right}>
								<Badge value="加急订单" status="success" textStyle={{ fontSize: 10 }} />
							</View>
						)}
					</View>
					<TouchableOpacity style={styles.order_item_touch} onPress={this.onSearchDetail.bind(this, id)}>
						<View style={styles.order_item_right_adrress}>
							<Text style={styles.font_desc_style}>预约时间：{home_time}</Text>
						</View>
						{cabinetAdderss && cabinetName ? (
							<View style={styles.order_item_right_adrress}>
								<Text style={styles.font_desc_style}>
									衣物存取地址：{cabinetAdderss} {cabinetName}
								</Text>
							</View>
						) : null}
						{Number(is_sure) === 2 ? <MoneyItem text={goods} money={detail.money} /> : null}
						{Number(urgency) === 2 && (
							<>
								<MoneyItem text="加急费用：" money={detail.urgencyMoney} />
							</>
						)}
						<MoneyItem text="优惠价格：" money={`-${detail.subDiscountMoney}`} />
						<MoneyItem text="洗衣总费用：" money={detail.payMoney} />
						<View style={styles.order_item_right_order_type}>
							<Text style={styles.font_desc_style}>订单方式：预约上门取衣</Text>
						</View>
					</TouchableOpacity>
					<View style={styles.order_item_right_bottom}>{this.renderBtn()}</View>
				</View>
			</View>
		);
	}
}

const order_item_left_width = 35;
const styles = StyleSheet.create({
	font_title_style: {
		fontSize: 14,
		color: '#606060',
	},
	font_desc_style: {
		fontSize: 12,
		color: '#333',
		lineHeight: 28,
	},
	order_item_touch: {
		paddingTop: 10,
	},
	order_item: {
		minHeight: 150,
		margin: 10,
		marginBottom: 0,
		backgroundColor: '#fff',
		flexDirection: 'row',
		padding: 10,
	},
	order_item_left: {
		width: order_item_left_width,
		height: order_item_left_width,
	},
	order_item_left_img: {
		width: order_item_left_width,
		height: order_item_left_width,
	},
	order_item_right: {
		flex: 1,
		marginLeft: 10,
	},
	order_item_right_title: {
		height: 20,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	order_item_right_title_left: {
		flex: 1,
	},
	order_item_right_title_right: {
		width: 72,
		alignItems: 'flex-end',
	},
	order_item_right_time: {
		height: 25,
		alignItems: 'center',
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: 1,
		flexDirection: 'row',
	},
	order_item_right_time_left: {
		flex: 1,
	},
	order_item_right_bottom: {
		height: 40,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	order_item_right_bottom_btn: {
		padding: 5,
		borderWidth: 1,
		borderColor: '#fb9dd0',
		alignItems: 'center',
		borderRadius: 5,
		marginHorizontal: 5,
	},
	order_pay_font: {
		color: '#fb9dd0',
	},
});
