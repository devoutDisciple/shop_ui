import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MessageItem from './MessageItem';
import Request from '../util/Request';
import Storage from '../util/Storage';
import Toast from '../component/Toast';
import Dialog from '../component/Dialog';
import Loading from '../component/Loading';
import Message from '../component/Message';
import CommonHeader from '../component/CommonHeader';
import ImagePicker from 'react-native-image-crop-picker';
import SafeViewComponent from '../component/SafeViewComponent';

export default class SettingScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shopDetail: {},
			visible: false,
			user: {},
			defalutValue: '',
			title: '',
			changeKey: '',
			loadingVisible: false,
		};
		this.onSearchShopDetail = this.onSearchShopDetail.bind(this);
	}

	async componentDidMount() {
		await this.onSearchShopDetail();
	}

	// 查询店铺信息
	async onSearchShopDetail() {
		this.setState({ loadingVisible: true });
		let shop = await Storage.get('shop');
		let res = await Request.get('/shop/getShopDetailById', { shopid: shop.id });
		let shopDetail = res.data;
		this.setState({ shopDetail, loadingVisible: false });
	}

	// 弹框确定的时候
	onOkDialog(key, value) {
		if (key === 'phone') {
			// 手机号不通过
			if (!/^1[3456789]\d{9}$/.test(value)) {
				return Message.warning('提示', '请输入正确的手机号码');
			}
		}
		this.setState({ visible: false });
		this.onSaveValue(key, value);
	}

	// 保存的时候
	async onSaveValue(key, value) {
		// 获取用户token值
		let params = { key, value };
		let shop = await Storage.get('shop');
		params.shopid = shop.id;
		let result = await Request.post('/shop/updateShopDetail', params);
		if (result.data === 'success') {
			Toast.success('修改成功');
			this.onSearchShopDetail();
		}
	}

	// 用户上传头像
	async selectPhoto() {
		ImagePicker.openPicker({
			width: 200,
			height: 200,
			cropping: true,
			cropperCircleOverlay: true,
			includeBase64: true,
		}).then(async response => {
			// 获取用户token值
			let shop = await Storage.get('shop');
			let data = { img: response.data, shopid: shop.id };
			let result = await Request.post('/shop/addPhoto', data);
			if (result.data === 'success') {
				Toast.success('店铺logo修改成功');
				this.onSearchShopDetail();
			}
		});
	}

	render() {
		const { navigation } = this.props,
			{ visible, shopDetail, changeKey, title, defalutValue, loadingVisible } = this.state;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="店铺设置" navigation={navigation} />
					<MessageItem
						label="店铺logo"
						value={shopDetail.url}
						showIcon
						isImage
						onPress={this.selectPhoto.bind(this)}
					/>
					<ScrollView style={styles.setting_content} showsVerticalScrollIndicator={false}>
						<MessageItem
							showIcon
							label="店铺名称"
							value={shopDetail.name}
							onPress={() => {
								this.setState(
									{ changeKey: 'name', title: '店铺名称', defalutValue: shopDetail.name },
									() => {
										this.setState({ visible: true });
									},
								);
							}}
						/>
						<MessageItem
							showIcon
							label="店铺经理"
							value={shopDetail.manager}
							onPress={() => {
								this.setState(
									{ changeKey: 'manager', title: '店铺经理名称', defalutValue: shopDetail.manager },
									() => {
										this.setState({ visible: true });
									},
								);
							}}
						/>
						<MessageItem
							showIcon
							label="联系方式"
							value={shopDetail.phone}
							onPress={() => {
								this.setState(
									{ changeKey: 'phone', title: '联系方式', defalutValue: shopDetail.phone },
									() => {
										this.setState({ visible: true });
									},
								);
							}}
						/>
						<MessageItem
							showIcon
							label="打印机KEY"
							value={shopDetail.key}
							onPress={() => {
								this.setState(
									{ changeKey: 'key', title: '打印机KEY', defalutValue: shopDetail.key },
									() => {
										this.setState({ visible: true });
									},
								);
							}}
						/>
						<MessageItem
							showIcon
							label="打印机SN"
							value={shopDetail.sn}
							onPress={() => {
								this.setState(
									{ changeKey: 'sn', title: '打印机SN', defalutValue: shopDetail.sn },
									() => {
										this.setState({ visible: true });
									},
								);
							}}
						/>
					</ScrollView>
					{visible && (
						<Dialog
							title={title}
							changeKey={changeKey}
							defalutValue={defalutValue}
							onOk={this.onOkDialog.bind(this)}
							onCancel={() => this.setState({ visible: false })}
						/>
					)}
					<Loading visible={loadingVisible} />
				</View>
			</SafeViewComponent>
		);
	}
}

const sex_common = {
	marginLeft: 20,
	borderWidth: 1,
	paddingHorizontal: 20,
	paddingVertical: 5,
	borderRadius: 13,
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	common_text_style: {
		fontSize: 16,
		color: '#333',
	},
	sex_container: {
		flexDirection: 'row',
	},
	sex_item_active: {
		...sex_common,
		borderColor: '#fb9cce',
		color: '#fb9cce',
	},
	sex_item_normal: {
		...sex_common,
		borderColor: '#e5e5e5',
		color: '#333',
	},
	setting_content: {
		flex: 1,
		marginTop: 5,
	},
	setting_content_item: {
		marginHorizontal: 10,
		height: 50,
		borderBottomColor: '#f1f1f1',
		borderBottomWidth: 0.5,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	setting_content_item_left: {
		width: 100,
		// backgroundColor: 'red',
		justifyContent: 'center',
	},
	setting_content_item_center: {
		flex: 1,
		// backgroundColor: 'blue',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	setting_content_item_center_img: {
		width: 40,
		height: 40,
		borderRadius: 50,
	},
	setting_content_item_right: {
		width: 30,
		// backgroundColor: 'orange',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
});
