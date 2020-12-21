import React from 'react';
import CommonSylte from '@/style/common';
import { Text, View, StyleSheet } from 'react-native';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	render() {
		let { orderDetail } = this.props;

		return (
			<View style={styles.detail_send}>
				<View style={styles.detail_common_title}>
					<Text>用户基本信息</Text>
				</View>
				<View style={styles.detail_send_content}>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>用户名称: </Text>
						<Text style={styles.detail_send_content_item_text}>{orderDetail.home_username}</Text>
					</View>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>联系方式: </Text>
						<Text style={styles.detail_send_content_item_text}>{orderDetail.home_phone}</Text>
					</View>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>用户地址: </Text>
						<Text style={styles.detail_send_content_item_text}>{orderDetail.home_address}</Text>
					</View>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>洗衣费用: </Text>
						<Text style={styles.detail_send_content_item_text}>{orderDetail.money}</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	detail_common_title: CommonSylte.detail_common_title,
	detail_send: {
		backgroundColor: '#fff',
		marginTop: 10,
		padding: 10,
	},
	detail_send_content_item: {
		flexDirection: 'row',
		marginBottom: 10,
		marginLeft: 20,
		height: 25,
		alignItems: 'center',
	},
	detail_send_content_item_label: {
		width: 80,
		lineHeight: 20,
	},
	detail_send_content_item_text: {
		flex: 1,
		color: '#8a8a8a',
		lineHeight: 20,
	},
});
