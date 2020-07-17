/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class Waller extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		let { orderTotalMoney, orderTotalNum } = this.props;
		return (
			<View style={styles.my_wallet}>
				<TouchableOpacity style={styles.my_wallet_chunk}>
					<Text style={styles.my_wallet_chunk_top}>{orderTotalMoney}</Text>
					<Text style={styles.my_wallet_chunk_bottom}>店铺总收入</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.my_wallet_chunk}>
					<Text style={styles.my_wallet_chunk_top}>{orderTotalNum}</Text>
					<Text style={styles.my_wallet_chunk_bottom}>店铺交易量</Text>
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
