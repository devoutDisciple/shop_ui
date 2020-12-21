import React from 'react';
import CommonSylte from '@/style/common';
import { StyleSheet, Text, View } from 'react-native';
import Chunk from './ShopChunk';

export default class MyScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	onGoShopDetail(type) {
		let { navigation } = this.props;
		if (type === 1) {
			return navigation.navigate('InputOrderScreen');
		}
		if (type === 2) {
			return navigation.navigate('CabinetScreen', { showCabinetBtn: false });
		}
		if (type === 3) {
			return navigation.navigate('ClothingScreen');
		}
	}

	render() {
		return (
			<View style={styles.module_chunk}>
				<View style={styles.detail_common_title}>
					<Text style={{ fontSize: 16, color: '#333' }}>店铺管理</Text>
				</View>
				<View style={styles.sales}>
					<Chunk
						title="订单录入"
						iconName="setting"
						className="sales_chunk1"
						onPress={this.onGoShopDetail.bind(this, 1)}
					/>
					{/* <Chunk
						title="洗衣柜状态"
						iconName="layout"
						className="sales_chunk2"
						onPress={this.onGoShopDetail.bind(this, 2)}
					/>
					<Chunk
						title="衣物管理"
						iconName="tagso"
						className="sales_chunk3"
						onPress={this.onGoShopDetail.bind(this, 3)}
					/> */}
				</View>
			</View>
		);
	}
}

// 展示头像的view高度
const styles = StyleSheet.create({
	detail_common_title: CommonSylte.detail_common_title,
	sales: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
