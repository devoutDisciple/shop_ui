/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
const { width } = Dimensions.get('window');

export default class MyScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	goOrder() {
		let { status, navigation } = this.props;
		navigation.navigate('OrdersScreen', { status: status });
	}

	render() {
		let { title, num } = this.props;
		return (
			<TouchableOpacity style={styles.chunk} onPress={this.goOrder.bind(this)}>
				<View style={styles[this.props.className]}>
					<View style={styles.sales_chunk_title}>
						<Text style={styles.sales_chunk_title_text}>{title}</Text>
					</View>
					<View style={styles.sales_chunk_num}>
						<Text style={styles.sales_chunk_num_text}>{num}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

let itemWidth = (width - 35) / 3;
const sales_chunk = {
	width: itemWidth,
	height: 100,
	borderColor: '#dbdbdb',
	borderWidth: 0.5,
	backgroundColor: '#fb9dd0',
};
// 展示头像的view高度
const styles = StyleSheet.create({
	chunk: {
		width: itemWidth,
		height: 100,
		marginLeft: 5,
		marginBottom: 10,
		borderColor: '#dbdbdb',
		borderWidth: 0.5,
	},
	sales_chunk1: {
		...sales_chunk,
		backgroundColor: '#fa6638',
	},
	sales_chunk2: {
		...sales_chunk,
		backgroundColor: '#435aa6',
	},
	sales_chunk3: {
		...sales_chunk,
		backgroundColor: '#8399ae',
	},
	sales_chunk4: {
		...sales_chunk,
		backgroundColor: '#595959',
	},
	sales_chunk5: {
		...sales_chunk,
		backgroundColor: '#52c41b',
	},
	sales_chunk6: {
		...sales_chunk,
		backgroundColor: '#fa85c0',
	},
	sales_chunk_title: {
		height: 50,
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
