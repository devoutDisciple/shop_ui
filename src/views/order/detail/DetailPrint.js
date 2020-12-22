import React from 'react';
import Message from '@/component/Message';
import Request from '@/util/Request';
import Toast from '@/component/Toast';
import NavigationUtil from '@/util/NavigationUtil';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	onPress() {
		let { orderid } = this.props;
		Message.confirm('打印该订单', '是否确认打印该订单', async () => {
			let res = await Request.post('/print/printOrder', { orderid: orderid });
			if (res.data === 'true') {
				Toast.success('已打印此订单');
			}
		});
	}

	deleteOrder() {
		let { orderid, navigation } = this.props;
		Message.confirm('删除订单', '请注意此操作不可恢复，请谨慎操作', async () => {
			let res = await Request.post('/order/deleteOrder', { orderid: orderid });
			if (res.data === 'success') {
				Toast.success('已删除该订单');
				setTimeout(() => {
					NavigationUtil.reset(navigation, 'HomeScreen');
				}, 1000);
			}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.btn} onPress={this.onPress.bind(this)}>
					<Text style={styles.btn_text}>打印此订单</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.btn, styles.error_btn]} onPress={this.deleteOrder.bind(this)}>
					<Text style={styles.btn_text}>删除此订单</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		flexDirection: 'row',
	},
	btn: {
		width: 120,
		height: 35,
		backgroundColor: '#fb9dd0',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginBottom: 40,
		marginLeft: 10,
	},
	error_btn: {
		backgroundColor: '#8a8a8a',
	},
	btn_text: {
		color: '#fff',
	},
});
