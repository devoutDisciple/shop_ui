/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Config from '../config/config';
// import FastImage from '../component/FastImage';
import NavigationUtil from '../util/NavigationUtil';
import SafeViewComponent from '../component/SafeViewComponent';
import Request from '../util/Request';
import { Image, View, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';
import config from '../config/config';

const screenWidth = Dimensions.get('window').width;

export default class Advertisement extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			height: 0,
			textArr: ['3 跳过', '2 跳过', '1 跳过', '跳过'],
			text: '3 跳过',
			goScreen: 'HomeScreen',
		};
	}

	componentWillUnmount() {
		this.timer && clearInterval(this.timer);
	}

	async componentDidMount() {
		await this.getMockFlag();
		await this.getImageSize();
		await this.startTimer();
	}

	// 是否开启mock
	async getMockFlag() {
		let res = await Request.get('/mock/getMockFlag', { version: config.currentVersion });
		console.log(res);
		let data = res.data;
		data = 1;
		if (Number(data) === 1) {
			return;
		} // 直接跳转home页面
		// 进入mock页面
		if (Number(data) === 2) {
			this.setState({ goScreen: 'MockScreen' });
		}
	}

	// 开启定时器
	startTimer() {
		let index = 0,
			{ textArr, goScreen } = this.state,
			{ navigation } = this.props;
		this.timer = setInterval(() => {
			if (index === 4) {
				clearInterval(this.timer);
				return NavigationUtil.reset(navigation, goScreen);
			}
			this.setState({ text: textArr[index] });
			index++;
		}, 1000);
	}

	getImageSize() {
		Image.getSize(`${Config.baseUrl}/advertisement.jpg`, (imgWidth, imgHeight) => {
			let pre = imgWidth / screenWidth;
			// eslint-disable-next-line radix
			let height = parseInt(imgHeight / pre);
			this.setState({ height: height });
		});
	}

	goHome() {
		let { navigation } = this.props,
			{ goScreen } = this.state;
		NavigationUtil.reset(navigation, goScreen);
	}

	render() {
		let { height, text } = this.state;
		return (
			<SafeViewComponent>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#fdfdfd',
					}}
				>
					<Image
						style={{ width: screenWidth, height: height }}
						source={{
							uri: `${Config.baseUrl}/advertisement.jpg`,
						}}
					/>
					<TouchableOpacity style={styles.skip} onPress={this.goHome.bind(this)}>
						<Text style={styles.skip_text}>{text}</Text>
					</TouchableOpacity>
				</View>
			</SafeViewComponent>
		);
	}
}

const styles = StyleSheet.create({
	skip: {
		position: 'absolute',
		right: 20,
		top: 70,
		height: 30,
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#bfbfbf',
		borderRadius: 50,
		opacity: 0.7,
	},
	skip_text: {
		color: '#fff',
		fontSize: 13,
	},
});
