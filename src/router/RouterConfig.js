/* eslint-disable react-native/no-inline-styles */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// 首页
import HomeScreen from '../home/index';

// 商店管理
import ShopDetailScreen from '../shopDetail/index';

// ===================

// 订单
import OrderScreen from '../order/Index';

// 我的  --------------------
import MyScreen from '../my/My';

// 二维码扫描页面
import ScanCameraScreen from '../scanCamera/ScanCamera';

// 设置商品金额页面
import GoodsScreen from '../goods/Goods';

// 订单详情页面
import OrderDetailScreen from '../order/detail/Detail';

// 选择柜子界面
import CabinetScreen from '../order/Cabinet/Cabinet';

// 登录页面
import LoginScreen from '../login/Login';

import TabBarItem from './TabBarItem';

// 订单页面
const OrderContainer = createStackNavigator(
	{
		OrderScreen: {
			screen: OrderScreen,
			navigationOptions: {
				headerShown: false,
			},
		},
	},
	{
		mode: 'card', // 定义页面渲染和转换的风格： card 页面转换风格，此项为缺省。 modal - 使页面从屏幕底部滑入，只适用于iOS
		headerMode: 'float', // headerMode -
	},
);

// 我的页面
const MyContainer = createStackNavigator(
	{
		MyScreen: {
			screen: MyScreen,
		},
	},
	{
		mode: 'card', // 定义页面渲染和转换的风格： card 页面转换风格，此项为缺省。 modal - 使页面从屏幕底部滑入，只适用于iOS
		headerMode: 'float', // headerMode -
	},
);

const TabNavigator = createBottomTabNavigator(
	{
		Order: {
			screen: OrderContainer,
			navigationOptions: {
				title: 'Order',
				tabBarLabel: '订单',
				tabBarIcon: ({ focused, tintColor }) => (
					<TabBarItem
						focused={focused}
						normalImage={require('../../img/tabbar/tabbar_order.png')}
						selectedImage={require('../../img/tabbar/tabbar_order_selected.png')}
					/>
				),
			},
		},
		My: {
			screen: MyContainer,
			navigationOptions: {
				title: 'My',
				tabBarLabel: '我的',
				tabBarIcon: ({ focused, tintColor }) => (
					<TabBarItem
						focused={focused}
						normalImage={require('../../img/tabbar/tabbar_mine.png')}
						selectedImage={require('../../img/tabbar/tabbar_mine_selected.png')}
					/>
				),
			},
		},
	},
	{
		initialRouteName: 'Order', // 第一次加载tab bar时路由的routeName
		tabBarOptions: {
			activeTintColor: '#fb9dd0', //当前选中的tab bar的文本颜色和图标颜色
			inactiveTintColor: '#8a8a8a', // 当前未选中的tab bar的文本颜色和图标颜色
			activeBackgroundColor: '#fff', // 当前选中的tab bar的背景色
			inactiveBackgroundColor: '#fff', //当前未选中的tab bar的背景色
			// labelStyle: {
			//     color: 'orange',
			// },
		},
	},
);

const finnalApp = createStackNavigator(
	{
		// 首页
		HomeScreen: {
			screen: HomeScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		// 商店管理
		ShopDetailScreen: {
			screen: ShopDetailScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		LoginScreen: {
			screen: LoginScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		// 订单页面
		OrderScreen: {
			screen: TabNavigator,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},
		// 选择快递柜子页面
		CabinetScreen: {
			screen: CabinetScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},
		// 订单详情页面
		OrderDetailScreen: {
			screen: OrderDetailScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},
		// 设置金额页面
		GoodsScreen: {
			screen: GoodsScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},
		// 二维码扫描页面
		ScanCameraScreen: {
			screen: ScanCameraScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},
	},
	{
		mode: 'card', // 定义页面渲染和转换的风格： card 页面转换风格，此项为缺省。 modal - 使页面从屏幕底部滑入，只适用于iOS
		headerMode: 'float', // headerMode -
	},
);

export default createAppContainer(finnalApp);
