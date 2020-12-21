import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// 首页
import HomeScreen from '@/views/home/index';

// 订单管理页面
import OrderScreen from '@/views/order/Index';

// 商店管理
import ShopDetailScreen from '@/views/shopDetail/index';

// 洗衣柜管理
import CabinetScreen from '@/views/cabinet/index';

// 衣物管理页面
import ClothingScreen from '@/views/clothing/index';

// 增加衣物页面
import AddClothingScreen from '@/views/clothing/AddClothing';

// 衣物编辑页面
import EditClothingScreen from '@/views/clothing/EditClothing';

// 广告页面
import AdvertisementScreen from '@/views/advertisement/index';

// mock---------------------------
// mock页面
import MockScreen from '@/views/mock/index';
import MockConcatusScreen from '@/views/mock/concatUs/ConcatUs';
import MockClothingScreen from '@/views/mock/clothing/Clothing';

// mock---------------------------

// // 销售额统计页面
// import SalesTypeScreen from '@/views/my/salesType/index';

// // 订单概况
// import orderOverviewScreen from '@/views/my/orderOverview/index';

// 订单录入
import InputOrderScreen from '@/views/inputOrder/index';

// 手机验证码登录  骗苹果审核  SecurityLoginScreen
import SecurityLoginScreen from '@/views/login/SecurityLogin';

// ===================

// 我的  --------------------
import MyScreen from '@/views/my/My';

// 二维码扫描页面
import ScanCameraScreen from '@/views/scanCamera/ScanCamera';

// 设置商品金额页面
import GoodsScreen from '@/views/goods/Goods';

// 订单详情页面
import OrderDetailScreen from '@/views/order/detail/Detail';

// 登录页面
import LoginScreen from '@/views/login/Login';

import TabBarItem from './TabBarItem';

// 订单页面
const HomeScreenContainer = createStackNavigator(
	{
		HomeScreen: {
			screen: HomeScreen,
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

const TabNavigator = createBottomTabNavigator(
	{
		Order: {
			screen: HomeScreenContainer,
			navigationOptions: {
				title: 'Order',
				tabBarLabel: '订单管理',
				tabBarIcon: ({ focused, tintColor }) => (
					<TabBarItem
						focused={focused}
						normalImage={require('@/asserts/tabbar/tabbar_order.png')}
						selectedImage={require('@/asserts/tabbar/tabbar_order_selected.png')}
					/>
				),
			},
		},
		My: {
			screen: MyContainer,
			navigationOptions: {
				title: 'My',
				tabBarLabel: '店铺管理',
				tabBarIcon: ({ focused, tintColor }) => (
					<TabBarItem
						focused={focused}
						normalImage={require('@/asserts/tabbar/tabbar_mine.png')}
						selectedImage={require('@/asserts/tabbar/tabbar_mine_selected.png')}
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
		// // 订单页面
		// OrderScreen: {
		// 	screen: TabNavigator,
		// 	navigationOptions: {
		// 		headerShown: false,
		// 		headerBackTitle: '返回',
		// 		headerBackAllowFontScaling: false,
		// 	},
		// },

		// 广告页面
		AdvertisementScreen: {
			screen: AdvertisementScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		// ------mock
		MockScreen: {
			screen: MockScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		// mock 联系我们
		MockConcatusScreen: {
			screen: MockConcatusScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		// mock 预约取衣
		MockClothingScreen: {
			screen: MockClothingScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		// 首页
		HomeScreen: {
			screen: TabNavigator,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		SecurityLoginScreen: {
			screen: SecurityLoginScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		// 衣物编辑页面
		EditClothingScreen: {
			screen: EditClothingScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		// 订单录入页面
		InputOrderScreen: {
			screen: InputOrderScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		// 订单概况
		// orderOverviewScreen: {
		// 	screen: orderOverviewScreen,
		// 	navigationOptions: {
		// 		headerShown: false,
		// 		headerBackTitle: '返回',
		// 		headerBackAllowFontScaling: false,
		// 	},
		// },

		// // 销售额统计页面
		// SalesTypeScreen: {
		// 	screen: SalesTypeScreen,
		// 	navigationOptions: {
		// 		headerShown: false,
		// 		headerBackTitle: '返回',
		// 		headerBackAllowFontScaling: false,
		// 	},
		// },

		// 订单管理
		OrdersScreen: {
			screen: OrderScreen,
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

		// 洗衣柜页面 CabinetScreen
		CabinetScreen: {
			screen: CabinetScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		// 衣物管理页面
		ClothingScreen: {
			screen: ClothingScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		// 增加衣物页面
		AddClothingScreen: {
			screen: AddClothingScreen,
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
