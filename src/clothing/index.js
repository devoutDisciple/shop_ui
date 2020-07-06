/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import GoodsItem from './GoodsItem';
import CommonHeader from '../component/CommonHeader';
import storageUtil from '../util/Storage';
import Request from '../util/Request';
import Loading from '../component/Loading';
import SafeViewComponent from '../component/SafeViewComponent';

export default class Goods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clothingDetail: [],
			loadingVisible: false,
			refreshLoadingVisible: false,
		};
		this.onSearchClothings = this.onSearchClothings.bind(this);
	}

	async componentDidMount() {
		await this.onSearchClothings();
	}

	// 获取店铺衣物
	async onSearchClothings() {
		this.setState({ loadingVisible: true });
		let shop = await storageUtil.get('shop');
		let res = await Request.get('/clothing/getAllByShopid', { shopid: shop.id });
		this.setState({ clothingDetail: res.data || [], loadingVisible: false });
	}

	render() {
		const { navigation } = this.props;
		let { clothingDetail, loadingVisible, refreshLoadingVisible } = this.state;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="衣物清洗费用管理" navigation={navigation} />
					<ScrollView
						style={styles.content}
						refreshControl={
							<RefreshControl
								refreshing={refreshLoadingVisible}
								onRefresh={this.onSearchClothings.bind(this)}
							/>
						}
					>
						<View style={styles.content_title}>
							<Text>衣物清洗费用管理</Text>
						</View>
						<View style={styles.content_clothing}>
							{clothingDetail &&
								clothingDetail.map((item, index) => {
									return (
										<GoodsItem
											key={index}
											data={item}
											onSearchClothings={this.onSearchClothings.bind(this)}
										/>
									);
								})}
						</View>
					</ScrollView>
					<TouchableOpacity
						style={styles.footer}
						onPress={() => this.props.navigation.navigate('AddClothingScreen')}
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
