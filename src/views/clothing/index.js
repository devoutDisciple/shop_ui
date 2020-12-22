import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import GoodsItem from './GoodsItem';
import CommonHeader from '@/component/CommonHeader';
import storageUtil from '@/util/Storage';
import Request from '@/util/Request';
import Loading from '@/component/Loading';
import SafeViewComponent from '@/component/SafeViewComponent';
import SelectTab from '../goods/SelectTab';

export default class Goods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loadingVisible: false,
			refreshLoadingVisible: false,
			tabList: [],
			selectId: '',
		};
	}

	async componentDidMount() {
		await this.getClothingType();
	}

	// 获取衣物分类
	async getClothingType() {
		let shop = await storageUtil.get('shop');
		let res = await Request.get('/clothing_type/getByShopid', { shopid: shop.id });
		let tabList = res.data || [],
			{ selectId } = this.state;
		if (tabList && tabList[0] && tabList[0].id && !selectId) {
			selectId = tabList[0].id;
		}
		this.setState({ tabList: tabList || [], selectId }, () => {
			this.onSearchClothings(selectId);
		});
	}

	// 选择衣物分类
	onSelectClothingType(selectId) {
		let { data } = this.state;
		data.forEach(item => {
			item.show = item.typeid === selectId;
		});
		this.setState({ data: data || [], selectId });
	}

	// 获取店铺衣物
	async onSearchClothings(selectId) {
		this.setState({ loadingVisible: true });
		let shop = await storageUtil.get('shop');
		let res = await Request.get('/clothing/getAllByShopid', { shopid: shop.id });
		let data = res.data || [];
		data.forEach(item => {
			item.show = item.typeid === selectId;
		});
		this.setState({ data: data, loadingVisible: false });
	}

	render() {
		const { navigation } = this.props;
		let { data, loadingVisible, refreshLoadingVisible, tabList, selectId } = this.state;

		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="衣物清洗费用管理" navigation={navigation} />
					<ScrollView
						style={styles.content}
						showsVerticalScrollIndicator={false}
						refreshControl={
							<RefreshControl
								refreshing={refreshLoadingVisible}
								onRefresh={this.onSearchClothings.bind(this, selectId)}
							/>
						}
					>
						<View style={styles.content_title}>
							<Text>衣物清洗费用管理</Text>
						</View>
						<SelectTab
							tabList={tabList}
							selectId={selectId}
							onSelectClothingType={this.onSelectClothingType.bind(this)}
						/>
						<View style={styles.content_clothing}>
							{data &&
								data.map(item => {
									if (item.show) {
										return (
											<GoodsItem
												key={item.id}
												data={item}
												navigation={navigation}
												onSearchClothings={this.getClothingType.bind(this)}
											/>
										);
									}
								})}
						</View>
					</ScrollView>
					<TouchableOpacity
						style={styles.footer}
						onPress={() =>
							this.props.navigation.navigate('AddClothingScreen', {
								onSearchClothings: this.getClothingType.bind(this),
								typeid: selectId,
							})
						}
					>
						<Text style={styles.footer_text}>增加衣物</Text>
					</TouchableOpacity>
					<Loading visible={loadingVisible} />
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
