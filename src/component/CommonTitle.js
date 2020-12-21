import React from 'react';
import CommonSylte from '@/style/common';
import { View, StyleSheet, Text } from 'react-native';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { title } = this.props;
		return (
			<View style={styles.detail_common_title}>
				<Text style={{ fontSize: 16, color: '#333' }}>{title}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	detail_common_title: CommonSylte.detail_common_title,
});
