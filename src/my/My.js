/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import My_Header from './Header';
import My_Wallert from './Wallet';
import ListItem from './ListItem';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    PushNotificationIOS,
} from 'react-native';
// import NotifService from './NotifService';

export default class MyScreen extends React.Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
        return {
            headerTitle: '',
            headerRight: () => {
                return (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.state.params.rightIconClick()
                        }>
                        <Icon
                            style={{width: 20, marginTop: 3, marginRight: 3}}
                            name="setting"
                            size={20}
                            color="#333"
                        />
                    </TouchableOpacity>
                );
            },
            headerStyle: {
                borderWidth: 0,
                borderBottomColor: '#fff',
            },
        };
    };

    constructor(props) {
        super(props);
        this.state = {};
        // this.notif = new NotifService(
        //     this.onRegister.bind(this),
        //     this.onNotif.bind(this),
        // );
    }

    onRegister(token) {
        Alert.alert('Registered !', JSON.stringify(token));
        console.log(token);
        this.setState({registerToken: token.token, gcmRegistered: true});
    }

    onNotif(notif) {
        console.log(notif);
        Alert.alert(notif.title, notif.message);
    }

    componentDidMount() {
        const {setParams} = this.props.navigation;
        setParams({
            rightIconClick: () => this.setIconClick(),
        });
    }

    // 点击设置按钮
    setIconClick() {
        this.props.navigation.navigate('MySetting');
    }

    // 点击登录
    onLogin() {
        this.props.navigation.navigate('LoginScreen');
    }

    // 点击销售统计
    onMyAddressClick() {
        // this.notif.localNotif();
        PushNotificationIOS.presentLocalNotification({
            alertBody: '您的会员已经到期',
            alertAction: 'alertAction',
            alertTitle: 'moving健身店',
            soundName: 'soundName',
            category: 'category',
            applicationIconBadgeNumber: 1,
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <My_Header navigation={this.props.navigation} />
                <My_Wallert navigation={this.props.navigation} />
                <ListItem
                    iconName="creditcard"
                    text="销售额统计"
                    onPress={this.onMyAddressClick.bind(this)}
                />
                <ListItem iconName="creditcard" text="销售量统计" />
                <ListItem iconName="creditcard" text="会员消费报表" />
                <ListItem iconName="creditcard" text="积分兑换记录" />
                <ListItem iconName="creditcard" text="钱包管理" />
                <ListItem iconName="creditcard" text="修改店铺信息" />
                <ListItem iconName="creditcard" text="客户意见反馈" />
            </ScrollView>
        );
    }
}
// 展示头像的view高度
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
});
