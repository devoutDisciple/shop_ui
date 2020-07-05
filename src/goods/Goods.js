/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Dimensions, Alert, TouchableOpacity } from 'react-native';
import GoodsItem from './GoodsItem';
import CommonHeader from '../component/CommonHeader';
import storageUtil from '../util/Storage';
import Toast from '../component/Toast';
import Request from '../util/Request';
import Loading from '../component/Loading';

const { width } = Dimensions.get('window');

export default class Goods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			totalPrice: 0,
			loadingVisible: false,
		};
	}

	async componentDidMount() {
		await this.getClothings();
	}

	// 查询衣物
	async getClothings() {
		try {
			this.setState({ loadingVisible: true });
			let shop = await storageUtil.get('shop');
			if (!shop) {
				this.props.navigation.navigate('LoginScreen');
				return Toast.warning('请登录!');
			}
			Request.get('/clothing/getAllByShopid', { shopid: shop.id }).then(res => {
				let data = res.data || [];
				if (Array.isArray(data) && data.length !== 0) {
					data.forEach(item => (item.num = 0));
				}
				this.setState({ data: data || [] });
			});
		} finally {
			this.setState({ loadingVisible: false });
		}
	}

	// 点击确定的时候
	onSureClothing() {
		let { totalPrice = 0, data } = this.state;
		let selectGoods = data.filter(item => item.num !== 0);
		Alert.alert(
			'提示',
			`该次洗衣总费用${totalPrice}元`,
			[
				{
					text: '确定',
					onPress: () => {
						this.props.navigation.navigate('CabinetScreen', {
							goods: selectGoods,
							totalPrice: totalPrice,
						});
					},
				},
			],
			{ cancelable: false },
		);
	}

	// 减少衣物
	onSubCloth(id) {
		let { data } = this.state;
		let goods = data.filter(item => item.id === id)[0];
		if (goods.num < 1) {
			return;
		}
		goods.num--;
		this.setState({ data }, () => this.onCountPrice());
	}

	// 增加衣物
	onAddCloth(id) {
		let { data } = this.state;
		let goods = data.filter(item => item.id === id)[0];
		goods.num++;
		this.setState({ data }, () => this.onCountPrice());
	}

	// 结算价格
	onCountPrice() {
		let data = this.state.data;
		let totalPrice = 0;
		data.map(item => {
			totalPrice += Number(item.price * item.num);
		});
		this.setState({ totalPrice });
	}

	render() {
		const { navigation } = this.props;
		let { data, totalPrice, loadingVisible } = this.state;
		return (
			<View style={styles.container}>
				<CommonHeader title="确认衣物价格" navigation={navigation} />
				<ScrollView style={styles.content}>
					<View style={styles.content_title}>
						<Text>洗衣费用价格计算</Text>
					</View>
					<View style={styles.content_clothing}>
						{data &&
							data.map((item, index) => {
								return (
									<GoodsItem
										key={index}
										id={item.id}
										num={item.num}
										name={item.name}
										source={item.url}
										price={item.price}
										onSubCloth={this.onSubCloth.bind(this)}
										onAddCloth={this.onAddCloth.bind(this)}
									/>
								);
							})}
					</View>
				</ScrollView>
				<View style={styles.footer}>
					<View style={styles.footer_left}>
						<View style={styles.footer_left_content}>
							<Text style={styles.footer_left_content_text}>洗衣费用: ￥</Text>
						</View>
						<View style={styles.footer_right_content}>
							<Text style={styles.footer_right_content_text}>{totalPrice}</Text>
						</View>
					</View>
					<TouchableOpacity style={styles.footer_right} onPress={this.onSureClothing.bind(this)}>
						<Text style={styles.footer_right_text}>确定</Text>
					</TouchableOpacity>
				</View>
				<Loading visible={loadingVisible} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		flexDirection: 'column',
	},
	content: {
		flex: 1,
		margin: 10,
	},
	content_title: {
		height: 20,
		justifyContent: 'center',
		paddingLeft: 10,
		borderLeftColor: '#fb9dd0',
		borderLeftWidth: 3,
	},
	content_clothing: {
		marginBottom: 20,
	},
	message_desc_input: {
		height: 100,
		width: width - 20,
		fontSize: 16,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		borderColor: '#cdcdcd',
		borderWidth: 0.5,
		borderRadius: 5,
	},
	content_input: {
		marginVertical: 20,
	},
	footer: {
		height: 50,
		flexDirection: 'row',
		borderTopColor: '#fb9dd0',
		borderTopWidth: 0.5,
	},
	footer_left: {
		flex: 1,
		paddingLeft: 10,
		justifyContent: 'center',
		backgroundColor: '#fff',
		flexDirection: 'row',
	},
	footer_left_content: {
		width: 82,
		justifyContent: 'center',
	},
	footer_left_content_text: {
		fontSize: 14,
		color: '#333',
	},
	footer_right_content: {
		flex: 1,
		justifyContent: 'center',
	},
	footer_right_content_text: {
		fontSize: 28,
		color: '#fb9dd0',
		fontWeight: '600',
		marginTop: -5,
	},
	footer_right: {
		width: 100,
		height: '100%',
		backgroundColor: '#fb9dd0',
		justifyContent: 'center',
		alignItems: 'center',
	},
	footer_right_text: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '900',
	},
});
