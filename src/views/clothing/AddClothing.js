import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Picker from 'react-native-picker';
import CommonHeader from '@/component/CommonHeader';
import storageUtil from '@/util/Storage';
import { baseColor, commonInputParams } from './commonParams';
import Request from '@/util/Request';
import { Kohana } from 'react-native-textinput-effects';
import Loading from '@/component/Loading';
import Config from '@/config/config';
import Toast from '@/component/Toast';

export default class Goods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clothingDetail: [],
			loadingVisible: false,
			name: '',
			price: 0,
			sort: 1,
			typeName: '',
			tabList: [],
		};
	}

	componentDidMount() {
		this.getClothingType();
	}

	// 获取衣物分类
	async getClothingType() {
		let shop = await storageUtil.get('shop');
		let res = await Request.get('/clothing_type/getByShopid', { shopid: shop.id });
		let tabList = res.data || [];
		let { navigation } = this.props;
		let typeid = navigation.getParam('typeid');
		let list = tabList.filter(item => item.id === typeid);
		if (list && list.length !== 0) {
			this.setState({ tabList, typeName: list[0].name });
		}
	}

	// 选择衣服分类
	selectType() {
		let { tabList } = this.state;
		let pickerData = [];
		tabList.forEach(item => pickerData.push(item.name));
		Picker.init({
			...Config.pickCommonConfig,
			pickerData,
			selectedValue: [25],
			onPickerConfirm: res => {
				let name = (res && res[0]) || '';
				this.setState({ typeName: name });
			},
			onPickerCancel: res => {
				console.log(res);
			},
			onPickerSelect: res => {
				console.log(res);
			},
		});
		Picker.show();
	}

	inputChange(key, value) {
		let params = {};
		params[key] = value;
		this.setState(params);
	}

	getSelectTypeid() {
		let { navigation } = this.props;
		let { typeName, tabList } = this.state;
		let typeid = navigation.getParam('typeid');
		let currentItem = tabList.filter(item => item.name === typeName);
		if (currentItem && currentItem[0]) {
			typeid = currentItem[0].id;
		}
		return typeid;
	}

	async addClothing() {
		let shop = await storageUtil.get('shop');
		let { navigation } = this.props;
		try {
			this.setState({ loadingVisible: true });
			let { name, price, sort } = this.state;
			let typeid = this.getSelectTypeid();
			let params = {
				shopid: shop.id,
				name,
				price,
				sort,
				typeid,
				create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
			};
			let res = await Request.post('/clothing/add', params);
			if (res && res.code === 200 && res.data === 'success') {
				Toast.success('新增成功');
				this.setState({ loadingVisible: false });
				navigation.state.params.onSearchClothings();
				navigation.goBack();
			}
		} catch (error) {
			console.log(error);
			this.setState({ loadingVisible: false });
			navigation.state.params.onSearchClothings();
		}
	}

	render() {
		const { navigation } = this.props;
		let { loadingVisible, typeName } = this.state;
		return (
			<View style={styles.container}>
				<CommonHeader title="新增衣物" navigation={navigation} />
				<View style={styles.content}>
					<View style={styles.input}>
						<View style={styles.input_label}>
							<Text style={styles.input_label_text}>名称:</Text>
						</View>
						<View style={styles.input_content}>
							<Kohana
								iconName="tagso"
								{...commonInputParams}
								label={'请输入衣物名称'}
								onChangeText={this.inputChange.bind(this, 'name')}
								// keyboardType="number-pad"
								selectionColor={baseColor.fontColor}
								maxLength={20}
							/>
						</View>
					</View>
					<View style={styles.input}>
						<View style={styles.input_label}>
							<Text style={styles.input_label_text}>价格:</Text>
						</View>
						<View style={styles.input_content}>
							<Kohana
								iconName="redenvelopes"
								{...commonInputParams}
								label="请输入衣物价格(元)"
								onChangeText={this.inputChange.bind(this, 'price')}
								keyboardType="number-pad"
								returnKeyType="done"
								selectionColor={baseColor.fontColor}
								maxLength={8}
							/>
						</View>
					</View>
					<View style={styles.input}>
						<View style={styles.input_label}>
							<Text style={styles.input_label_text}>权重:</Text>
						</View>
						<View style={styles.input_content}>
							<Kohana
								iconName="flag"
								{...commonInputParams}
								label={'请输入衣物权重'}
								onChangeText={this.inputChange.bind(this, 'sort')}
								keyboardType="number-pad"
								returnKeyType="done"
								selectionColor={baseColor.fontColor}
								maxLength={8}
							/>
						</View>
					</View>
					<View style={styles.input}>
						<View style={styles.input_label}>
							<Text style={styles.input_label_text}>分类:</Text>
						</View>
						<TouchableOpacity style={styles.input_type} onPress={this.selectType.bind(this)}>
							<Text style={styles.input_type_text}>{typeName}</Text>
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity style={styles.footer} onPress={this.addClothing.bind(this)}>
					<Text style={styles.footer_text}>确定</Text>
				</TouchableOpacity>
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

	input: {
		height: 60,
		flexDirection: 'row',
		width: '100%',
	},
	input_label: {
		width: 60,
		paddingTop: 26,
		alignItems: 'flex-end',
	},
	input_label_text: {
		fontSize: 16,
	},
	input_content: {
		flex: 1,
	},
	input_type: {
		flex: 1,
		paddingTop: 26,
	},
	input_type_text: {
		fontSize: 16,
		marginLeft: 30,
		marginTop: 1,
	},

	footer: {
		height: 50,
		backgroundColor: '#fb9dd0',
		justifyContent: 'center',
		alignItems: 'center',
	},
	footer_text: {
		fontSize: 20,
		color: '#fff',
		fontWeight: '600',
	},
});
