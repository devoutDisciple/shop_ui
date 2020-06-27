/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { StyleSheet, Text, ScrollView, View, Dimensions } from 'react-native';
import CommonHeader from '../component/CommonHeaderNoBack';
import CommonSylte from '../style/common';
const { width } = Dimensions.get('window');

export default class MyScreen extends React.Component {
	render() {
		const { navigation } = this.props;

		return (
			<View style={styles.container}>
				<CommonHeader title="MOVING洗衣" navigation={navigation} />
				<ScrollView style={styles.view_container}>
					<View style={styles.detail_common_title}>
						<Text style={{ fontSize: 16, color: '#333' }}>订单数据</Text>
					</View>
					<View style={styles.shop_manager}>
						<View style={styles.chunk}>
							<Text>123</Text>
						</View>
						<View style={styles.chunk}>
							<Text>123</Text>
						</View>
						<View style={styles.chunk}>
							<Text>123</Text>
						</View>
						<View style={styles.chunk}>
							<Text>123</Text>
						</View>
						<View style={styles.chunk}>
							<Text>123</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

let itemWidth = (width - 35) / 3;
// 展示头像的view高度
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	view_container: {
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	shop_manager: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	chunk: {
		width: itemWidth,
		height: 100,
		marginLeft: 5,
		marginBottom: 10,
		borderColor: '#dbdbdb',
		borderWidth: 0.5,
	},
	detail_common_title: CommonSylte.detail_common_title,
});
