import React from 'react';
import CommonSylte from '../../style/common';
import Loading from '../../component/Loading';
import CommonHeader from '../../component/CommonHeader';
import { ScrollView, StyleSheet, View } from 'react-native';
import SafeViewComponent from '../../component/SafeViewComponent';
import CommonTitle from '../../component/CommonTitle';

import OrderType from './OrderType';
import PayType from './OrderNumByTime';

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
					<CommonHeader title="订单概况" navigation={navigation} />
					<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
						<CommonTitle title="订单方式统计" />
						<OrderType />
						<CommonTitle title="订单趋势统计（过去七天）" />
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
