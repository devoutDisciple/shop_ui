/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import My_Header from './Header';
import My_Wallert from './Wallet';
import ListItem from './ListItem';
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleSheet, TouchableOpacity, ScrollView, View} from 'react-native';

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

    // 点击注册
    onRegister() {
        this.props.navigation.navigate('ResgisterScreen');
    }

    // 点击我的地址
    onMyAddressClick() {
        this.props.navigation.navigate('AddressScreen');
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
