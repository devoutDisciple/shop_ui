import React from 'react';
import Message from '../../component/Message';
import Request from '../../util/Request';
import Toast from '../../component/Toast';
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

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.btn} onPress={this.onPress.bind(this)}>
					<Text style={styles.btn_text}>打印此订单</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	btn: {
		width: 120,
		height: 35,
		backgroundColor: '#fb9dd0',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	btn_text: {
		color: '#fff',
	},
});
