/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Request from '../../util/Request';
import Config from '../../config/config';
import Toast from '../../component/Toast';
import Message from '../../component/Message';
import FastImage from '../../component/FastImage';
import FilterStatus from '../../util/FilterStatus';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default class AllOrder extends React.Component {
	constructor(props) {
		super(props);
		this.renderBtn = this.renderBtn.bind(this);
		this.updateOrderStatus = this.updateOrderStatus.bind(this);
	}

	// 更新衣物状态
	async updateOrderStatus() {
		let { id } = this.props.detail;
		let orderStatus = await Request.post('/order/updateOrderStatus', { orderid: id, status: 5 });
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

	// 完成兑换
	finishOrder() {
		Message.confirm('请确认', '兑换商品已送到用户', async () => {
			this.props.setLoading(true);
			await this.updateOrderStatus();
			this.props.setLoading(false);
			Toast.success('已完成兑换');
			this.props.onSearch();
		});
	}

	renderBtn() {
		let actionBtn = [];
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
		// 已完成
		const saveClothingBtn = (
			<TouchableOpacity
				key="saveClothingBtn"
				style={styles.order_item_right_bottom_btn}
				onPress={this.finishOrder.bind(this)}
			>
				<Text style={styles.order_pay_font}>已兑换</Text>
			</TouchableOpacity>
		);
		actionBtn = [connectBtn, saveClothingBtn];
		return actionBtn;
	}

	render() {
		let { id, code, create_time, goods, intergral_num, status } = this.props.detail;
		goods = JSON.parse(goods || {});
		return (
			<View style={styles.order_item}>
				<View style={styles.order_item_left}>
					<FastImage style={styles.order_item_left_img} source={{ uri: `${Config.baseUrl}/${goods.url}` }} />
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
						<Text style={{ fontSize: 10, color: '#333' }}>{create_time}</Text>
					</View>
					<TouchableOpacity style={styles.order_item_touch} onPress={this.onSearchDetail.bind(this, id)}>
						<View style={styles.order_item_right_goods}>
							<View style={styles.order_item_right_goods_left}>
								<Text style={styles.font_desc_style}>兑换商品：{goods.name}</Text>
							</View>
							<View style={styles.order_item_right_goods_right}>
								<Text style={styles.font_desc_style}>{intergral_num} 积分</Text>
							</View>
						</View>
						<View style={styles.order_item_right_adrress}>
							<Text style={styles.font_desc_style}>订单方式：积分兑换</Text>
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
		height: 20,
		justifyContent: 'center',
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: 1,
	},
	order_item_right_goods: {
		flexDirection: 'row',
		marginTop: 5,
	},
	order_item_right_goods_left: {
		flex: 1,
	},
	order_item_right_goods_right: {
		width: 70,
		alignItems: 'flex-end',
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
