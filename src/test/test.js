/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import CommonHeader from '../../component/CommonHeader';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		const { navigation } = this.props;
		return (
			<View style={{ flex: 1 }}>
				<CommonHeader title="订单详情" navigation={navigation} />
				<ScrollView style={styles.detail_content} showsVerticalScrollIndicator={false}>
					<View>
						<Text>123</Text>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	detail_content: {
		flex: 1,
		backgroundColor: '#f7f7f7',
	},
});
