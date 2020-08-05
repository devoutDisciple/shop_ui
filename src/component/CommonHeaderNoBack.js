import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Member extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		const { title } = this.props;
		return (
			<View style={styles.header}>
				<Text style={styles.header_text}>{title}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		height: 40,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomColor: '#8a8a8a',
		borderBottomWidth: 0.5,
	},
	header_text: {
		fontSize: 16,
		color: '#333',
	},
});
