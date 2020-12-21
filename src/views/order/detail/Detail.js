import React from 'react';
import DetailSave from './DetailSave';
import DetailUser from './DetailUser';
import Detailgoods from './DetailGoods';
import DetailPrint from './DetailPrint';
import Request from '@/util/Request';
import Loading from '@/component/Loading';
import { Badge } from 'react-native-elements';
import CommonHeader from '@/component/CommonHeader';
import DetailShopOrder from './DetailShopOrder';
import DetailOrderByShoperInput from './DetailOrderByShoperInput';
import { Text, View, ScrollView, StyleSheet } from 'react-native';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orderDetail: {},
			loadingVisible: false,
			type: 1, // 默认是从柜子下的订单
		};
	}

	async componentDidMount() {
		await this.getOrderById();
	}

	// 根据订单id获取订单
	async getOrderById() {
		this.setState({ loadingVisible: true });
		const { navigation } = this.props;
		let id = navigation.getParam('id');
		let order = await Request.get('/order/getOrderById', { id });
		this.setState({ orderDetail: order.data || {}, loadingVisible: false, type: order.data.order_type });
	}

	render() {
		const { navigation } = this.props,
			{ orderDetail, loadingVisible, type } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<CommonHeader title="订单详情" navigation={navigation} />
				<ScrollView style={styles.detail_content} showsVerticalScrollIndicator={false}>
					<View style={styles.detail_content_title}>
						<Text style={styles.detail_content_title_num}>订单编号: {orderDetail.code}</Text>
						<View style={styles.detail_content_title_time}>
							<Text style={styles.detail_content_title_time_left}>{orderDetail.create_time}</Text>
							{orderDetail.urgency === 2 && (
								<Badge value="加急订单" status="success" textStyle={{ fontSize: 10 }} />
							)}
						</View>
					</View>
					<Detailgoods orderDetail={orderDetail} type={type} />
					{Number(type) === 5 ? <DetailShopOrder orderDetail={orderDetail} /> : null}
					{Number(orderDetail.order_type) === 4 ? (
						<DetailOrderByShoperInput orderDetail={orderDetail} type={type} />
					) : (
						<>
							<DetailUser orderDetail={orderDetail} type={type} />
							<DetailSave orderDetail={orderDetail} type={type} />
						</>
					)}
					<DetailPrint orderid={orderDetail.id} />
				</ScrollView>
				<Loading visible={loadingVisible} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	detail_content: {
		flex: 1,
		backgroundColor: '#f7f7f7',
		padding: 10,
	},
	detail_content_title: {
		backgroundColor: '#fff',
		padding: 10,
	},
	detail_content_title_num: {
		fontSize: 14,
		color: '#333',
	},
	detail_content_title_time: {
		marginTop: 5,
		flexDirection: 'row',
	},
	detail_content_title_time_left: {
		flex: 1,
		fontSize: 12,
		color: '#8a8a8a',
	},
	detail_content_title_time_right: {
		fontSize: 12,
		color: '#8a8a8a',
	},
});
