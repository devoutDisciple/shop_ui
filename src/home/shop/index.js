/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import CommonSylte from '../../style/common';
import { StyleSheet, Text, View } from 'react-native';
import Chunk from './ShopChunk';

export default class MyScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	render() {
		return (
			<View style={styles.module_chunk}>
				<View style={styles.detail_common_title}>
					<Text style={{ fontSize: 16, color: '#333' }}>店铺管理</Text>
				</View>
				<View style={styles.sales}>
					<Chunk className="sales_chunk1" title="店铺信息录入" num={100} />
					<Chunk className="sales_chunk2" title="打印机录入" num={200} />
					<Chunk className="sales_chunk3" title="店铺logo" num={300} />
					<Chunk className="sales_chunk4" title="店铺评价" num={400} />
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
