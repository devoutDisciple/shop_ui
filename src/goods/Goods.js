/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CommonHeader from '../component/CommonHeader';

export default class Goods extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <CommonHeader title="设置订单金额" navigation={navigation} />
                <Text style={{fontSize: 18, color: '#bfbfbf'}}>商品页面</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
