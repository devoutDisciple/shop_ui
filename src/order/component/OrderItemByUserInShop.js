/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MoneyItem from './MoneyItem';
import Request from '../../util/Request';
import Config from '../../config/config';
import Toast from '../../component/Toast';
import StrageUtil from '../../util/Storage';
import { Badge } from 'react-native-elements';
import Message from '../../component/Message';
import FastImage from '../../component/FastImage';
import FilterStatus from '../../util/FilterStatus';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default class AllOrder extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	// 打开柜子
	async onOpenCabinet() {
		Message.confirm('是否打开格口', '请确认在柜子旁', async () => {
			try {
				let { id } = this.props.detail;
				let user = await StrageUtil.get('user');
				this.props.setLoading(true);
				let result = await Request.post('/order/openCellById', { orderId: id, status: 2, optid: user.id });
				this.props.setLoading(false);
				if (result.data === 'success') {
					Message.warning('柜门已打开', '请取出衣物，随手关门，谢谢！');
					return this.props.onSearch();
				}
				return Message.warning('网络错误', '请稍后重试！');
			} catch (error) {
				this.props.setLoading(false);
			}
		});
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

		// 打开柜子
		const openBoxBtn = (
			<TouchableOpacity
				key="openBoxBtn"
				onPress={this.onOpenCabinet.bind(this)}
				style={styles.order_item_right_bottom_btn}
			>
				<Text style={styles.order_pay_font}>打开柜子</Text>
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

		if (status === 1) {
			actionBtn = [connectBtn, openBoxBtn];
		}
		if (status === 2) {
			actionBtn = [connectBtn, setMoney];
			is_sure === 2 && actionBtn.push(saveClothingBtn);
		}
		if (status === 3 || status === 4) {
			actionBtn = [connectBtn];
		}
		if (status === 5) {
			actionBtn = [connectBtn];
		}
		return actionBtn;
	}

	render() {
		const { goods, detail } = this.props;
		const { id, shopName, cabinetUrl, create_time, cabinetAdderss, cabinetName, urgency, status } = detail;
		return (
			<View style={styles.order_item}>
				<View style={styles.order_item_left}>
					<FastImage style={styles.order_item_left_img} source={{ uri: `${Config.baseUrl}/${cabinetUrl}` }} />
				</View>
				<View style={styles.order_item_right}>
					<View style={styles.order_item_right_title}>
						<View style={styles.order_item_right_title_left}>
							<Text style={styles.font_title_style}>{shopName}</Text>
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
						{cabinetAdderss && cabinetName ? (
							<View style={styles.order_item_right_adrress}>
								<Text style={styles.font_desc_style}>
									存取地址：{cabinetAdderss} {cabinetName}
								</Text>
							</View>
						) : null}
						<MoneyItem text={goods} money={detail.money} />
						{Number(urgency) === 2 && (
							<>
								<MoneyItem text="加急费用：" money={detail.urgencyMoney} />
							</>
						)}
						<MoneyItem text="优惠价格：" money={`-${detail.subDiscountMoney}`} />
						<MoneyItem text="洗衣总费用：" money={detail.payMoney} />
						<View style={styles.order_item_right_order_type}>
							<Text style={styles.font_desc_style}>
								客户要求配送方式：{FilterStatus.filterSendStatus(detail.send_status)}
							</Text>
						</View>
						<View style={styles.order_item_right_order_type}>
							<Text style={styles.font_desc_style}>订单方式：店内下单</Text>
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
