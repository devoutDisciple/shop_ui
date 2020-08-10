import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
					<Text style={styles.title_text}>周四洗衣五折起</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.value_text}>
						&emsp;&emsp;亲爱的用户朋友们，你们好，锐动洗衣经过五年来的发展和努力，以及广大用户的支持与信任，
						目前已经初具一定的市场规模。因此为了反馈广大用户的支持与喜爱，锐动洗衣决定每周四下单，即可享用五折优惠!!!
					</Text>
				</View>
				<View style={styles.title}>
					<Text style={styles.title_text}>免费洗衣服务</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.value_text}>
						&emsp;&emsp;为了反馈广大用户的支持和信任，锐动洗衣决定每月五号随机抽取两名幸运用户，享受免费洗衣服务，
						免费派送服务，衣物将有锐动洗衣店员派送到家，让您享受至尊VIP服务!!!
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		marginLeft: 15,
	},
	title: {
		marginTop: 10,
	},
	title_text: {
		fontSize: 16,
		color: '#333',
	},

	value_text: {
		fontSize: 12,
		marginTop: 10,
		color: '#8a8a8a',
		lineHeight: 18,
	},
});
