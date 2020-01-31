/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import CommonHeader from '../component/CommonHeader';

const {width} = Dimensions.get('window');

export default class Goods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 1, 2, 3, 4],
        };
    }

    componentDidMount() {}

    render() {
        const {navigation} = this.props;
        let {data} = this.state;
        return (
            <View style={styles.container}>
                <CommonHeader title="设置订单金额" navigation={navigation} />
                <ScrollView style={styles.content}>
                    <View style={styles.content_title}>
                        <Text>衣物结算</Text>
                    </View>
                    <View style={styles.content_clothing}>
                        {data &&
                            data.map((item, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={styles.content_clothing_item}>
                                        <Image
                                            style={
                                                styles.content_clothing_item_img
                                            }
                                            source={require('../../img/lunbo/2.jpg')}
                                        />
                                        <View
                                            style={
                                                styles.content_clothing_item_title
                                            }>
                                            <Text
                                                style={
                                                    styles.content_clothing_item_title_text
                                                }>
                                                羽绒服羽绒服羽
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                styles.content_clothing_item_money
                                            }>
                                            <Text
                                                style={
                                                    styles.content_clothing_item_money_text
                                                }>
                                                ￥ {index}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            })}
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <View style={styles.footer_left}>
                        <View style={styles.footer_left_content}>
                            <Text style={styles.footer_left_content_text}>
                                总金额： ￥
                            </Text>
                        </View>

                        <View style={styles.footer_right_content}>
                            <Text style={styles.footer_right_content_text}>
                                200
                            </Text>
                        </View>
                    </View>
                    <View style={styles.footer_right}>
                        <Text style={styles.footer_right_text}>确定</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    content: {
        flex: 1,
        margin: 10,
    },
    content_title: {
        // backgroundColor: 'red',
        height: 20,
        justifyContent: 'center',
        paddingLeft: 10,
        borderLeftColor: '#fb9dd0',
        borderLeftWidth: 3,
    },

    content_clothing: {
        // backgroundColor: 'red',
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: '#dbdbdb',
        borderLeftWidth: 0.5,
        borderTopWidth: 0.5,
    },
    content_clothing_item: {
        height: width / 3 + 50,
        width: width / 3 - 7,
        borderWidth: 0.5,
        borderColor: '#dbdbdb',
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    content_clothing_item_img: {
        width: width / 3 - 7,
        height: width / 3 - 7,
    },
    content_clothing_item_title: {
        justifyContent: 'center',
        // paddingLeft: 5,
        margin: 5,
    },
    content_clothing_item_title_text: {
        fontSize: 12,
        color: '#333',
    },
    content_clothing_item_money: {
        height: 20,
        justifyContent: 'center',
        paddingLeft: 5,
    },
    content_clothing_item_money_text: {
        fontSize: 14,
        color: '#8a8a8a',
    },

    footer: {
        height: 50,
        flexDirection: 'row',
    },
    footer_left: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
        // alignItems: 'flex-start',
        backgroundColor: '#fbc2dd',
        flexDirection: 'row',
    },
    footer_left_content: {
        width: 85,
        justifyContent: 'center',
    },
    footer_left_content_text: {
        fontSize: 14,
        color: '#fff',
    },
    footer_right_content: {
        flex: 1,
        justifyContent: 'center',
    },
    footer_right_content_text: {
        fontSize: 28,
        color: '#ff4343',
        fontWeight: '600',
        marginTop: -5,
    },
    footer_right: {
        width: 100,
        backgroundColor: '#fb9dd0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer_right_text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
    },
});
