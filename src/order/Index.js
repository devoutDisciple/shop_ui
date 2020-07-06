/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import Order from './component/Order';
import FilterStatus from '../util/FilterStatus';
import CommonHeader from '../component/CommonHeader';
import SafeViewComponent from '../component/SafeViewComponent';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { navigation } = this.props;
		let status = navigation.getParam('status');
		return (
			<SafeViewComponent>
				<View style={{ flex: 1 }}>
					<CommonHeader title={FilterStatus.filterOrderStatus(status)} navigation={navigation} />
					<Order navigation={navigation} type="all" status={status} />
				</View>
			</SafeViewComponent>
		);
	}
}
