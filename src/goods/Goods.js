import React from 'react';
import GoodsItem from './GoodsItem';
import Request from '../util/Request';
import Toast from '../component/Toast';
import Picker from 'react-native-picker';
import storageUtil from '../util/Storage';
import Loading from '../component/Loading';
import CommonHeader from '../component/CommonHeader';
import SafeViewComponent from '../component/SafeViewComponent';
import ClothingAddDialog from '../component/ClothingAddDialog';
import { Text, View, StyleSheet, ScrollView, Dimensions, Alert, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default class Goods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			totalPrice: '0.00',
			discountText: '10折',
			subMoney: '0.00',
			originPrice: '0.00',
			isThursday: false,
			loadingVisible: false,
			addClothingVisible: false,
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
			let { navigation } = this.props;
			let orderId = navigation.getParam('orderId');
			// 获取订单衣物
			let result = await Request.get('/order/getOrderById', { id: orderId });
			let goods = result.data && result.data.goods ? result.data.goods : '[]';
			goods = JSON.parse(goods);
			let { money, origin_money, discount } = result.data;
			let res = await Request.get('/clothing/getAllByShopid', { shopid: shop.id });
			let data = res.data || [];
			if (Array.isArray(data) && data.length !== 0) {
				data.forEach(item => {
					let currentSelectGoods = goods.filter(good => good.id === item.id);
					if (currentSelectGoods && currentSelectGoods.length) {
						return (item.num = currentSelectGoods[0].num);
					}
					item.num = 0;
				});
			}
			if (Array.isArray(goods) && Array.isArray(data)) {
				goods.forEach(item => {
					if (!item.id) {
						data.push(item);
					}
				});
			}
			let isThursday = Number(result.weekDay) === 4;
			let subMoney = Number(Number(origin_money) - Number(money)).toFixed(2);
			this.setState({
				data: data || [],
				totalPrice: money,
				discountText: discount + '折',
				originPrice: origin_money,
				subMoney,
				loadingVisible: false,
				isThursday, // 是否是周四
			});
		} catch {
			this.setState({ loadingVisible: false });
		}
	}

	// 减少衣物
	onSubCloth(idx) {
		let { data } = this.state,
			goods = data[idx];
		if (goods.num < 1) {
			return;
		}
		goods.num--;
		this.setState({ data }, () => this.onCountPrice());
	}

	// 增加衣物
	onAddCloth(idx) {
		let { data } = this.state;
		let goods = data[idx];
		goods.num++;
		this.setState({ data }, () => this.onCountPrice());
	}

	// 增加衣物类型
	onAddClothingType(params) {
		let { data } = this.state;
		data.push({ name: params.name, price: params.price, num: 1 });
		this.setState({ data, addClothingVisible: false }, () => {
			this.onCountPrice();
		});
	}

	// 设置折扣
	setDiscount() {
		let num = 10,
			data = [],
			{ discountText } = this.state;
		for (let i = 0; i < 20; i++) {
			let text = num - 0.5 * i + '折';
			data.push(text);
		}
		data.push('免费');
		Picker.init({
			pickerConfirmBtnText: '确认',
			pickerCancelBtnText: '取消',
			pickerTitleText: '',
			pickerConfirmBtnColor: [251, 156, 206, 1],
			pickerCancelBtnColor: [196, 199, 206, 1],
			pickerTitleColor: [251, 156, 206, 1],
			pickerData: data,
			selectedValue: [discountText],
			onPickerConfirm: res => {
				this.setState({ discountText: res[0] });
				this.onCountPrice();
			},
		});
		Picker.show();
	}

	// 结算价格
	onCountPrice() {
		let { data, discountText } = this.state;
		let discount = 1;
		if (discountText === '免费') {
			discount = 0;
		}
		if (discountText && discountText.includes('折')) {
			let num = discountText.split('折')[0];
			discount = Number(num) / 10;
		}
		let originPrice = 0;
		data.map(item => {
			originPrice += Number(item.price * item.num);
		});
		originPrice = Number(originPrice).toFixed(2);
		let currentMoney = (originPrice * discount).toFixed(2);
		let subMoney = Number(originPrice - currentMoney).toFixed(2);
		this.setState({ originPrice: originPrice, totalPrice: currentMoney, subMoney });
	}

	// 点击确定的时候
	onSureClothing() {
		let { totalPrice = 0, data, originPrice, discountText } = this.state;
		let { navigation } = this.props;
		let orderId = navigation.getParam('orderId');
		let discount = 10;
		if (discountText === '免费') {
			discount = 0;
		}
		if (discountText && discountText.includes('折')) {
			discount = Number(discountText.split('折')[0]);
		}
		let selectGoods = data.filter(item => item.num !== 0);
		Alert.alert(
			'提示',
			`该次洗衣总费用${totalPrice}元`,
			[
				{
					text: '确定',
					onPress: async () => {
						this.setState({ loadingVisible: true });
						let result = await Request.post('/order/sureOrder', {
							orderId: orderId,
							goods: selectGoods,
							totalPrice,
							originMoney: originPrice,
							discount: discount,
						});
						this.setState({ loadingVisible: false });
						if (result || result.data === 'success') {
							navigation.navigate('OrdersScreen', { status: 2, flash: true });
							return Toast.success('更改成功');
						}
					},
				},
			],
			{ cancelable: false },
		);
	}

	render() {
		const { navigation } = this.props;
		let {
			data,
			totalPrice,
			originPrice,
			loadingVisible,
			discountText,
			subMoney,
			isThursday,
			addClothingVisible,
		} = this.state;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="确认衣物价格" navigation={navigation} />
					<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
						<View style={styles.content_title}>
							<Text>洗衣费用价格计算</Text>
						</View>
						<View style={styles.content_clothing}>
							{data &&
								data.map((item, index) => {
									return (
										<GoodsItem
											key={index}
											idx={index}
											num={item.num}
											name={item.name}
											price={item.price}
											onSubCloth={this.onSubCloth.bind(this)}
											onAddCloth={this.onAddCloth.bind(this)}
										/>
									);
								})}
						</View>
						<View style={styles.add_clothing}>
							<TouchableOpacity
								style={styles.add_clothing_container}
								onPress={() => this.setState({ addClothingVisible: true })}
							>
								<Text style={styles.add_clothing_text}>增加衣物 </Text>
							</TouchableOpacity>
						</View>
						<View style={styles.content_title}>
							<Text>会员日下单</Text>
						</View>
						<View style={styles.member_order}>
							<Text style={styles.member_order_label}>是否会员日下单(每周四)</Text>
							<Text style={isThursday ? styles.member_order_value : styles.member_order_value}>
								{isThursday ? '是' : '否'}
							</Text>
						</View>
						<View style={styles.content_title}>
							<Text>设置折扣</Text>
						</View>
						<View style={styles.discount_sub}>
							<Text style={styles.discount_label}>原价：</Text>
							<Text style={styles.origin_text}>{originPrice}</Text>
						</View>
						<View style={styles.discount_sub}>
							<Text style={styles.discount_label}>已减：</Text>
							<Text style={styles.discount_value}>- {subMoney}</Text>
						</View>
						<View style={styles.member_order}>
							<Text style={styles.discount_label}>当前折扣：</Text>
							<Text style={styles.discount_value}>{discountText}</Text>
							<TouchableOpacity
								style={styles.discount_btn_container}
								onPress={this.setDiscount.bind(this)}
							>
								<Text style={styles.discount_btn}>设置</Text>
							</TouchableOpacity>
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
					{addClothingVisible && (
						<ClothingAddDialog
							onAddClothingType={this.onAddClothingType.bind(this)}
							onCancel={() => this.setState({ addClothingVisible: false })}
						/>
					)}
				</View>
			</SafeViewComponent>
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
	member_order: {
		flexDirection: 'row',
		marginVertical: 10,
		height: 40,
		alignItems: 'center',
	},
	member_order_label: {
		flex: 1,
		color: '#707070',
	},
	member_order_value: {
		color: '#8a8a8a',
		paddingRight: 10,
	},
	discount_label: {
		// width: 80,
		color: '#707070',
	},
	discount_value: {
		flex: 1,
		color: '#8a8a8a',
		fontSize: 16,
		fontWeight: '600',
	},
	discount_btn_container: {
		width: 50,
		height: 30,
		marginRight: 10,
		backgroundColor: '#fb9dd0',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	discount_btn: {
		color: '#fff',
	},
	discount_sub: {
		flexDirection: 'row',
		height: 20,
		alignItems: 'center',
		marginTop: 20,
	},
	discount_sub_text: {
		color: 'red',
	},
	origin_text: {
		fontSize: 16,
		fontWeight: '600',
	},
	add_clothing: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	add_clothing_container: {
		width: 80,
		height: 30,
		backgroundColor: '#fb9dd0',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	add_clothing_text: {
		color: '#fff',
	},
});
