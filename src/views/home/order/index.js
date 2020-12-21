import React from 'react';
import CommonSylte from '@/style/common';
import Chunk from './OrderChunk';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
const { width } = Dimensions.get('window');

export default class MyScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	goOrder(status) {
		let { navigation } = this.props;
		navigation.navigate('OrdersScreen', { status: status });
	}

	render() {
		let { orderTypeNum } = this.props;
		let { navigation } = this.props;
		return (
			<View style={styles.module_chunk}>
				<View style={styles.detail_common_title}>
					<Text style={{ fontSize: 16, color: '#333' }}>订单链路</Text>
				</View>
				<View style={styles.sales_top}>
					<TouchableOpacity style={styles.sales_chunk1} onPress={this.goOrder.bind(this, 1)}>
						<View style={styles.sales_chunk_title}>
							<Text style={styles.sales_chunk_title_text}>洗衣柜未收取订单</Text>
						</View>
						<View style={styles.sales_chunk_num}>
							<Text style={styles.sales_chunk_num_text}>{orderTypeNum.orderType1}</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.sales_chunk2} onPress={this.goOrder.bind(this, 5)}>
						<View style={styles.sales_chunk_title}>
							<Text style={styles.sales_chunk_title_text}>已完成订单</Text>
						</View>
						<View style={styles.sales_chunk_num}>
							<Text style={styles.sales_chunk_num_text}>{orderTypeNum.orderType5}</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={styles.sales}>
					<Chunk
						className="sales_chunk2"
						title="上门取衣订单"
						status={6}
						navigation={navigation}
						num={orderTypeNum.orderType6}
					/>
					<Chunk
						className="sales_chunk6"
						title="积分兑换订单"
						status={7}
						navigation={navigation}
						num={orderTypeNum.orderType7}
					/>
					<Chunk
						className="sales_chunk1"
						title="清洗中订单"
						status={2}
						navigation={navigation}
						num={orderTypeNum.orderType2}
					/>
					{/* <Chunk
						className="sales_chunk3"
						title="待派送订单"
						status={9}
						navigation={navigation}
						num={orderTypeNum.orderType9}
					/> */}
					<Chunk
						className="sales_chunk3"
						title="用户未收取订单"
						status={3}
						navigation={navigation}
						num={orderTypeNum.orderType3}
					/>
					<Chunk
						className="sales_chunk5"
						title="订单录入"
						status={-1}
						navigation={navigation}
						num={orderTypeNum.orderType6}
					/>
				</View>
			</View>
		);
	}
}

let itemWidth = (width - 30) / 2;
const common_chunk = {
	width: itemWidth,
	height: itemWidth / 2,
	borderColor: '#dbdbdb',
	borderWidth: 0.5,
};
// 展示头像的view高度
const styles = StyleSheet.create({
	detail_common_title: CommonSylte.detail_common_title,
	sales: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	sales_top: {
		flexDirection: 'row',
		marginTop: 3,
		marginBottom: 15,
		justifyContent: 'space-between',
	},
	sales_chunk1: {
		...common_chunk,
		backgroundColor: '#fa6638',
		// backgroundColor: '#7fe8fe',
	},
	sales_chunk2: {
		...common_chunk,
		backgroundColor: '#52c41b',
		// backgroundColor: '#fcca81',
	},
	sales_chunk_title: {
		height: itemWidth / 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	sales_chunk_title_text: {
		fontSize: 12,
		color: '#fff',
	},
	sales_chunk_num: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	sales_chunk_num_text: {
		fontSize: 20,
		color: '#fff',
		fontWeight: '700',
	},
});
