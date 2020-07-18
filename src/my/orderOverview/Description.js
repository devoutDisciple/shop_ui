import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { text, value } = this.props;
		return (
			<View style={styles.desc}>
				<Text style={styles.label}>{text}</Text>
				<Text style={styles.value}>￥{value}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	desc: {
		flexDirection: 'row',
		height: 30,
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingLeft: 10,
	},
	label: {
		color: '#333',
		fontSize: 12,
	},
	value: {
		color: '#333',
		fontSize: 12,
		marginLeft: 10,
	},
});
