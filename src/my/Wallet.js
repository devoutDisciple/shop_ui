/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default class Waller extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    // 点击成为会员
    beMember() {
        this.props.navigation.navigate('MemberScreen');
    }

    render() {
        return (
            <View style={styles.my_wallet}>
                <TouchableOpacity style={styles.my_wallet_chunk}>
                    <Text style={styles.my_wallet_chunk_top}>3000</Text>
                    <Text style={styles.my_wallet_chunk_bottom}>
                        店铺总营业额
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.my_wallet_chunk}>
                    <Text style={styles.my_wallet_chunk_top}>0</Text>
                    <Text style={styles.my_wallet_chunk_bottom}>交易量</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    my_wallet: {
        height: 80,
        marginTop: 10,
        flexDirection: 'row',
    },
    my_wallet_chunk: {
        width: 100,
        alignItems: 'center',
    },
    my_wallet_chunk_top: {
        fontSize: 18,
        maxWidth: 129,
        maxHeight: 20,
        marginVertical: 10,
    },
    my_wallet_chunk_bottom: {
        color: '#bfbfbf',
    },
});
