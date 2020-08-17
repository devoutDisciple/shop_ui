/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import CommonHeader from '../component/CommonHeaderNoBack';
import SafeViewComponent from '../component/SafeViewComponent';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import CommonSylte from '../style/common';
import Swiper from './SwiperList';
import IconList from './IconList';
import News from './News';
import { ScrollView } from 'react-native-gesture-handler';

export default class Advertisement extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshLoadingVisible: false,
			swiperList: [
				{
					url: 'swiper/swiper_6PAEDG2GNV4L_1595007486982.jpg',
				},
				{
					url: 'swiper/swiper_CTPWVXLVELMK_1595007533208.jpg',
				},
			],
		};
	}

	async componentDidMount() {}

	initSearch() {}

	render() {
		let { navigation } = this.props;
		let { refreshLoadingVisible, swiperList } = this.state;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="锐动洗衣" navigation={navigation} />
					<ScrollView
						style={styles.view_container}
						showsVerticalScrollIndicator={false}
						refreshControl={
							<RefreshControl refreshing={refreshLoadingVisible} onRefresh={this.initSearch.bind(this)} />
						}
					>
						<Swiper
							navigation={navigation}
							shopid={26}
							swiperList={swiperList}
							// onShowPreviewModal={this.onShowPreviewModal.bind(this)}
						/>
						<View style={styles.detail_common_title}>
							<Text style={{ fontSize: 16, color: '#333' }}>精选服务</Text>
						</View>
						{/* 图标选项 */}
						<IconList navigation={navigation} />
						<View style={styles.detail_common_title}>
							<Text style={{ fontSize: 16, color: '#333' }}>特色服务</Text>
						</View>
						<News />
					</ScrollView>
				</View>
			</SafeViewComponent>
		);
	}
}

const styles = StyleSheet.create({
	detail_common_title: {
		...CommonSylte.detail_common_title,
		marginTop: 15,
		marginBottom: -15,
		marginLeft: 10,
	},
	container: {
		flex: 1,
	},
	view_container: {
		flex: 1,
		paddingHorizontal: 10,
	},
});
