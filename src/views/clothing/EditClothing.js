import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import CommonHeader from '@/component/CommonHeader';
import { baseColor, commonInputParams } from './commonParams';
import Request from '@/util/Request';
import { Kohana } from 'react-native-textinput-effects';
import Loading from '@/component/Loading';
import Toast from '@/component/Toast';

export default class Goods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clothingDetail: {},
			loadingVisible: false,
			name: '',
			price: 0,
			sort: 1,
		};
	}

	async componentDidMount() {
		// 获取衣物详情
		await this.getClothingDetail();
	}

	// 获取衣物详情
	async getClothingDetail() {
		let { navigation } = this.props;
		let id = navigation.getParam('id');
		this.setState({ loadingVisible: true });
		let result = await Request.get('/clothing/getDetailById', { id });
		let clothingDetail = result.data || {};
		this.setState({ clothingDetail, loadingVisible: false });
	}

	inputChange(key, value) {
		let { clothingDetail } = this.state;
		clothingDetail[key] = value;
		this.setState({ clothingDetail });
	}

	async updateClothing() {
		let { clothingDetail } = this.state;
		let { navigation } = this.props;
		this.setState({ loadingVisible: true });
		let res = await Request.post('/clothing/updateClothing', { data: clothingDetail });
		if (res && res.code === 200 && res.data === 'success') {
			Toast.success('更新成功，请刷新列表');
			this.setState({ loadingVisible: false });
			navigation.state.params.onSearchClothings();
			navigation.goBack();
		}
	}

	render() {
		const { navigation } = this.props;
		let { loadingVisible, clothingDetail } = this.state;
		return (
			<View style={styles.container}>
				<CommonHeader title="衣物编辑" navigation={navigation} />
				<View style={styles.content}>
					<View style={styles.input}>
						<View style={styles.input_label}>
							<Text style={styles.input_label_text}>名称:</Text>
						</View>
						<View style={styles.input_content}>
							<Kohana
								iconName="tagso"
								{...commonInputParams}
								label="请输入衣物名称"
								value={clothingDetail.name}
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
								value={clothingDetail.price}
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
								label="请输入衣物权重"
								value={clothingDetail.sortNum}
								onChangeText={this.inputChange.bind(this, 'sortNum')}
								keyboardType="number-pad"
								returnKeyType="done"
								selectionColor={baseColor.fontColor}
								maxLength={8}
							/>
						</View>
					</View>
				</View>
				<TouchableOpacity style={styles.footer} onPress={this.updateClothing.bind(this)}>
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
