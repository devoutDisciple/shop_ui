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

	onGoShopDetail() {
		let { navigation } = this.props;
		navigation.navigate('ShopDetailScreen');
	}

	render() {
		return (
			<View style={styles.module_chunk}>
				<View style={styles.detail_common_title}>
					<Text style={{ fontSize: 16, color: '#333' }}>店铺管理</Text>
				</View>
				<View style={styles.sales}>
					<Chunk
						title="店铺设置"
						iconName="setting"
						className="sales_chunk1"
						onPress={this.onGoShopDetail.bind(this)}
					/>
					<Chunk
						title="洗衣柜管理"
						iconName="layout"
						className="sales_chunk2"
						onPress={this.onGoShopDetail.bind(this)}
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
