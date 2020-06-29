/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Request from '../util/Request';
import CommonSylte from '../style/common';
import CommonHeader from '../component/CommonHeader';
import CabinetItem from './CabinetItem';
import Storage from '../util/Storage';
import { Text, View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Loading from '../component/Loading';

const { width } = Dimensions.get('window');

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingVisible: false,
			cabinetDetail: [],
		};
		this.onSearchCabinet = this.onSearchCabinet.bind(this);
	}

	async componentDidMount() {
		await this.onSearchCabinet();
	}

	async onSearchCabinet() {
		let shop = await Storage.get('shop');
		let shopid = shop.id;
		let res = await Request.get('/cabinet/getAllByShopId', { shopid });
		this.setState({ cabinetDetail: res.data || [] });
	}

	render() {
		const { navigation } = this.props;
		let { loadingVisible, cabinetDetail } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<CommonHeader
					title="洗衣柜管理"
					navigation={navigation}
					back={() => navigation.navigate('HomeScreen')}
				/>
				<ScrollView style={styles.cabinet}>
					{cabinetDetail.map((item, index) => {
						return <CabinetItem key={index} data={item} />;
					})}
				</ScrollView>
				<Loading visible={loadingVisible} />
			</View>
		);
	}
}

let itemHeight = (width - 60) / 2 + 20;
const styles = StyleSheet.create({
	cabinet: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 10,
		marginBottom: 10,
	},
	detail_common_title: CommonSylte.detail_common_title,
});
