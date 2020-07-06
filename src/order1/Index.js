/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
// 未取件订单
import WaitPickup from './WaitPickup';
// 未派送订单
import WaitSend from './WaitSend';
// 客户未取件订单
import WaitPesonPickup from './WaitPesonPickup';
// 已完成订单
import Complete from './Complete';
import CommonHeader from '../component/CommonHeader';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPageIndex: 1,
		};
	}

	componentDidMount() {}

	// 改变tab的时候
	changeTab(data) {
		this.setState({
			currentPageIndex: data.i + 1,
		});
	}

	render() {
		const { navigation } = this.props;
		let { currentPageIndex } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<CommonHeader title="全部订单" />
				{/* <View
					style={{
						height: 50,
						marginTop: 20,
					}}
				>
					<ScrollableTabView
						tabBarActiveTextColor="#fb9dd0"
						tabBarInactiveTextColor="#333"
						tabBarUnderlineStyle={{
							backgroundColor: '#fb9dd0',
							borderRadius: 3,
						}}
						initialPage={0}
						onChangeTab={this.changeTab.bind(this)}
						renderTabBar={() => <DefaultTabBar containerWidth={100} />}
					>
						<Text style={{ height: 0 }} tabLabel="待取件" />
						<Text style={{ height: 0 }} tabLabel="待派送" />
						<Text style={{ height: 0 }} tabLabel="客户未取件" />
						<Text style={{ height: 0 }} tabLabel="已完成" />
					</ScrollableTabView>
				</View> */}
				{currentPageIndex === 1 && <WaitPickup navigation={navigation} type={1} />}
				{currentPageIndex === 2 && <WaitSend navigation={navigation} type={2} />}
				{currentPageIndex === 3 && <WaitPesonPickup navigation={navigation} type={3} />}
				{currentPageIndex === 4 && <Complete navigation={navigation} type={4} />}
			</View>
		);
	}
}
