/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import CommonSylte from '../../style/common';
import { StyleSheet, Text, View } from 'react-native';
import Chunk from './OrderChunk';

export default class MyScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	render() {
		let { orderTypeNum } = this.props;
		let { navigation } = this.props;
		return (
			<View style={styles.module_chunk}>
				<View style={styles.detail_common_title}>
					<Text style={{ fontSize: 16, color: '#333' }}>订单链路</Text>
				</View>
				<View style={styles.sales}>
					<Chunk
						className="sales_chunk1"
						title="店铺待收取订单"
						status={1}
						navigation={navigation}
						num={orderTypeNum.orderType1}
					/>
					<Chunk
						className="sales_chunk2"
						title="清洗中订单"
						status={2}
						navigation={navigation}
						num={orderTypeNum.orderType2}
					/>
					<Chunk
						className="sales_chunk3"
						title="待付款订单"
						status={3}
						navigation={navigation}
						num={orderTypeNum.orderType3}
					/>
					<Chunk
						className="sales_chunk4"
						title="用户未收取订单"
						status={4}
						navigation={navigation}
						num={orderTypeNum.orderType4}
					/>
					<Chunk
						className="sales_chunk5"
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
				</View>
			</View>
		);
	}
}

// 展示头像的view高度
const styles = StyleSheet.create({
	detail_common_title: CommonSylte.detail_common_title,
	sales: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
