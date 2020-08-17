import React from 'react';
import Message from '../component/Message';
import IconWithText from '../component/IconWithText';
import { View, StyleSheet, Linking } from 'react-native';

export default class IconList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			num: 1,
		};
	}

	async componentDidMount() {}

	// icon点击的时候
	async onIconPress(data) {
		let { navigation } = this.props;
		// 上门取衣
		if (data && data.key === 'clothing') {
			navigation.navigate('MockClothingScreen');
		}

		// 联系我们
		if (data && data.key === 'phone') {
			let tel = 'tel:18210619398';
			Linking.canOpenURL(tel)
				.then(supported => {
					if (!supported) {
						Message.warning('商家电话', '18210619398');
					} else {
						return Linking.openURL(tel);
					}
				})
				.catch(error => {
					Message.warning('商家电话', '18210619398');
				});
		}

		// 官网
		if (data && data.key === 'guanwang') {
			let url = 'http://47.107.43.166/';
			Linking.canOpenURL(url)
				.then(supported => {
					if (supported) {
						Linking.openURL(url);
					} else {
					}
				})
				.catch(error => {
					console.log(error);
				});
		}

		// 关于我们
		if (data && data.key === 'about') {
			navigation.navigate('MockConcatusScreen');
		}
	}

	render() {
		const iconList1 = [
			{
				key: 'clothing',
				url: require('../../img/home/service.png'),
				text: '上门取衣',
			},
			{
				key: 'phone',
				url: require('../../img/home/jifen.png'),
				text: '电话预约',
			},
			{
				key: 'about',
				url: require('../../img/home/hello.png'),
				text: '关于我们',
			},
			{
				key: 'guanwang',
				url: require('../../img/home/icon6.png'),
				text: '锐动官网',
			},
		];

		return (
			<View style={styles.icon_container}>
				<View style={styles.home_icon}>
					{iconList1.map((item, index) => {
						return (
							<IconWithText
								key={index}
								onPress={this.onIconPress.bind(this, item)}
								source={item.url}
								text={item.text}
								index={`incon1_${index}`}
							/>
						);
					})}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	icon_container: {
		marginTop: 10,
	},
	home_icon: {
		height: 80,
		marginHorizontal: 10,
		flexDirection: 'row',
	},
	home_icon_item: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	home_icon_item_text: {
		marginTop: 10,
		fontSize: 12,
	},
});
