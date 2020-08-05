import React from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import CommonSylte from '../style/common';

export default class Advertisement extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {}

	initSearch() {}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.title}>
					<Text style={styles.title_text}>锐动洗衣正式版即将上线</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.value_text}>
						&emsp;&emsp;亲爱的用户朋友们，你们好，MOVING在线下已经经营多家门店，现在开展线上程序，方便各位新老用户使用，
						目前仅仅上线了预约功能，后续功能正在开发中，不久的将来，将会投入运营，敬请期待！！！
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		marginLeft: 10,
	},
	title: {
		height: 14,
		// backgroundColor: 'red',
		marginBottom: -2,
	},
	title_text: {
		fontSize: 14,
	},

	value_text: {
		fontSize: 12,
		marginTop: 10,
		color: '#8a8a8a',
		lineHeight: 18,
	},
});
