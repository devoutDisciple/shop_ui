import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import CommonHeader from '../component/CommonHeader';
import storageUtil from '../util/Storage';
import { baseColor, commonInputParams } from './commonParams';
import Request from '../util/Request';
import { Kohana } from 'react-native-textinput-effects';
import Loading from '../component/Loading';
import Toast from '../component/Toast';

export default class Goods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clothingDetail: [],
			loadingVisible: false,
			name: '',
			price: 0,
			sort: 1,
		};
	}

	inputChange(key, value) {
		let params = {};
		params[key] = value;
		this.setState(params);
	}

	async addClothing() {
		this.setState({ loadingVisible: true });
		let shop = await storageUtil.get('shop');
		let { name, price, sort } = this.state;
		let params = { shopid: shop.id, name, price, sort, create_time: moment().format('YYYY-MM-DD HH:mm:ss') };
		let res = await Request.post('/clothing/add', params);
		if (res && res.code === 200 && res.data === 'success') {
			Toast.success('新增成功');
			this.setState({ loadingVisible: false });
			this.props.navigation.goBack();
		}
	}

	render() {
		const { navigation } = this.props;
		let { loadingVisible } = this.state;
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
								label={'请输入衣物价格'}
								onChangeText={this.inputChange.bind(this, 'price')}
								keyboardType="number-pad"
								selectionColor={baseColor.fontColor}
								maxLength={20}
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
								selectionColor={baseColor.fontColor}
								maxLength={20}
							/>
						</View>
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
		fontSize: 18,
	},
	input_content: {
		flex: 1,
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
