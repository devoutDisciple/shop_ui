/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class MyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    // 点击编辑按钮
    editBtnClick() {
        console.log(this.props);
        this.props.navigation.navigate('MyMessage');
    }

    render() {
        return (
            <View style={styles.my_header}>
                <View style={styles.my_header_img_container}>
                    <Image
                        style={styles.my_header_image}
                        source={require('../../img/public/header.jpg')}
                    />
                </View>
                <View style={styles.my_header_message}>
                    <View style={styles.my_header_message_name}>
                        <Text style={styles.my_header_message_name_left_text}>
                            广州市洗衣店
                        </Text>
                    </View>
                    <View style={styles.my_header_message_member}>
                        <Text style={styles.my_header_message_member_text}>
                            角色:{'  '}
                        </Text>
                        <Text style={styles.my_header_message_member_text}>
                            店员
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
// 展示头像的view高度
let headerHeight = 70;
const styles = StyleSheet.create({
    my_header: {
        height: headerHeight,
        flexDirection: 'row',
    },
    my_header_img_container: {
        height: headerHeight,
        width: headerHeight,
    },
    my_header_image: {
        height: headerHeight,
        width: headerHeight,
        borderRadius: 100,
    },
    my_header_message: {
        flex: 1,
    },
    my_header_message_name: {
        height: 40,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    my_header_message_name_left_text: {
        fontSize: 16,
        color: '#333',
    },
    my_header_message_name_right: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    my_header_message_member: {
        height: 30,
        paddingHorizontal: 9,
        backgroundColor: '#fb9dd0',
        marginLeft: 11,
        flexDirection: 'row',
        borderRadius: 20,
        alignItems: 'center',
    },
    my_header_message_member_text: {
        fontSize: 13,
        color: '#fff',
    },
});
