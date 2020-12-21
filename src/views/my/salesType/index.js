import React from 'react';
import CommonSylte from '@/style/common';
import Loading from '@/component/Loading';
import CommonHeader from '@/component/CommonHeader';
import { ScrollView, StyleSheet, View } from 'react-native';
import SafeViewComponent from '@/component/SafeViewComponent';
import CommonTitle from '@/component/CommonTitle';

import SalesType from './SalesType';
import PayType from './PayType';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingVisible: false,
		};
	}

	async componentDidMount() {}

	render() {
		const { navigation } = this.props;
		const { loadingVisible } = this.state;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="营销总览" navigation={navigation} />
					<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
						<CommonTitle title="收入类型占比" />
						<SalesType />
						<CommonTitle title="收入趋势图（过去七天）" />
						<PayType />
					</ScrollView>
					<Loading visible={loadingVisible} />
				</View>
			</SafeViewComponent>
		);
	}
}

const styles = StyleSheet.create({
	detail_common_title: CommonSylte.detail_common_title,
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
	},
});
