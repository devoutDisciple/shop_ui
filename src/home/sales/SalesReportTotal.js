/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import CommonSylte from '../../style/common';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default class MyScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	render() {
		let { orderTotalNum, orderTotalMoney } = this.props;
		return (
			<View style={styles.module_chunk}>
				<View style={styles.detail_common_title}>
					<Text style={{ fontSize: 16, color: '#333' }}>销售总览</Text>
				</View>
				<View style={styles.sales}>
					<View style={styles.sales_chunk1}>
						<View style={styles.sales_chunk_title}>
							<Text style={styles.sales_chunk_title_text}>总销售额(元)</Text>
						</View>
						<View style={styles.sales_chunk_num}>
							<Text style={styles.sales_chunk_num_text}>{orderTotalMoney}</Text>
						</View>
					</View>
					<View style={styles.sales_chunk2}>
						<View style={styles.sales_chunk_title}>
							<Text style={styles.sales_chunk_title_text}>总订单量(单)</Text>
						</View>
						<View style={styles.sales_chunk_num}>
							<Text style={styles.sales_chunk_num_text}>{orderTotalNum}</Text>
						</View>
					</View>
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
		marginTop: 3,
		marginBottom: 15,
		justifyContent: 'space-between',
	},
	sales_chunk1: {
		...common_chunk,
		backgroundColor: '#7fe8fe',
	},
	sales_chunk2: {
		...common_chunk,
		backgroundColor: '#fcca81',
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
