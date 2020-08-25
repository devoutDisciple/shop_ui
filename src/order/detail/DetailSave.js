import React from 'react';
import CommonShow from './CommonShow';
import CommonSylte from '../../style/common';
import { Text, View, StyleSheet } from 'react-native';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	render() {
		let { orderDetail, type } = this.props;
		// type-1 快递柜下单 2-积分兑换 3-上门取衣
		if (orderDetail.cabinetAddress && (Number(type) === 1 || Number(type) === 5)) {
			return (
				<View style={styles.detail_send}>
					<View style={styles.detail_common_title}>
						<Text>存放信息</Text>
					</View>
					<View style={styles.detail_send_content}>
						<CommonShow
							label="存货时间"
							value={orderDetail.modify_time ? orderDetail.modify_time : orderDetail.create_time}
						/>
						<CommonShow
							label="存货地点"
							value={`${orderDetail.cabinetAddress} ${orderDetail.cabinetName}`}
						/>
						<CommonShow label="存放格口" value={`${orderDetail.cellid} 格口`} />
					</View>
				</View>
			);
		}
		if (Number(type) === 2) {
			return (
				<>
					{orderDetail.cabinetAddress ? (
						<View style={styles.detail_send2}>
							<View style={styles.detail_common_title}>
								<Text>衣物存放地点</Text>
							</View>
							<View style={styles.detail_send_content}>
								<CommonShow label="取货方式" value="MOVING洗衣柜" />
								<CommonShow
									label="存货地点"
									value={`${orderDetail.cabinetAddress} ${orderDetail.cabinetName}`}
								/>
								<CommonShow label="存储格口" value={orderDetail.cellid} />
							</View>
						</View>
					) : null}
					<View style={styles.detail_send}>
						<View style={styles.detail_common_title}>
							<Text>预约信息</Text>
						</View>
						<View style={styles.detail_send_content}>
							<CommonShow label="派送费用" value={`￥${Number(orderDetail.send_money).toFixed(2)}`} />
							<CommonShow label="订单金额" value={`￥${Number(orderDetail.money).toFixed(2)}`} />
							<CommonShow label="取衣时间" value={orderDetail.home_time} />
							<CommonShow label="取衣地点" value={orderDetail.home_address} />
							<CommonShow label="联系人" value={orderDetail.home_username} />
							<CommonShow label="联系方式" value={orderDetail.home_phone} />
							<CommonShow label="备注" value={orderDetail.desc} />
						</View>
					</View>
				</>
			);
		}
		if (Number(type) === 3) {
			return (
				<View style={styles.detail_send}>
					<View style={styles.detail_common_title}>
						<Text>兑换人信息</Text>
					</View>
					<View style={styles.detail_send_content}>
						<CommonShow label="收货人" value={orderDetail.intergral_username} />
						<CommonShow label="联系方式" value={orderDetail.intergral_phone} />
						<CommonShow label="收货地址" value={orderDetail.intergral_address} />
						<CommonShow label="消耗积分" value={orderDetail.intergral_num} />
						<CommonShow label="兑换时间" value={orderDetail.create_time} />
					</View>
				</View>
			);
		}
		return null;
	}
}

const styles = StyleSheet.create({
	detail_common_title: CommonSylte.detail_common_title,
	detail_send: {
		backgroundColor: '#fff',
		marginTop: 10,
		padding: 10,
		marginBottom: 20,
	},
	detail_send2: {
		backgroundColor: '#fff',
		marginTop: 10,
		padding: 10,
	},
});
