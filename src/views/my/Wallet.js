import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class Waller extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		let { orderTotalMoney, orderTotalNum, userDetail } = this.props;
		return (
			<View style={styles.my_wallet}>
				<TouchableOpacity style={styles.my_wallet_chunk}>
					<Text style={styles.my_wallet_chunk_top}>{userDetail.role === 3 ? '****' : orderTotalMoney}</Text>
					<Text style={styles.my_wallet_chunk_bottom}>总收入</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.my_wallet_chunk}>
					<Text style={styles.my_wallet_chunk_top}>{userDetail.role === 3 ? '****' : orderTotalNum}</Text>
					<Text style={styles.my_wallet_chunk_bottom}>订单总量</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	my_wallet: {
		height: 70,
		marginTop: 10,
		flexDirection: 'row',
	},
	my_wallet_chunk: {
		width: 100,
		alignItems: 'center',
	},
	my_wallet_chunk_top: {
		fontSize: 18,
		maxWidth: 129,
		maxHeight: 20,
		marginVertical: 10,
	},
	my_wallet_chunk_bottom: {
		color: '#bfbfbf',
	},
});
