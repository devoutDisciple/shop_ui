/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Request from '../util/Request';
import Toast from '../component/Toast';
import Message from '../component/Message';

const { width } = Dimensions.get('window');

export default class Goods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	async deleteClothing() {
		Message.confirm('删除', `是否确认删除 ${this.props.data.name}`, async () => {
			let res = await Request.post('/clothing/deleteById', { id: this.props.data.id });
			if (res && res.code === 200 && res.data === 'success') {
				this.props.onSearchClothings();
				return Toast.success('删除成功');
			}
		});
	}

	render() {
		const { data } = this.props;
		return (
			<View style={styles.goodsItem}>
				<View style={styles.goodsItem_name}>
					<Text style={styles.goodsItem_name_text}>{data.name}</Text>
				</View>
				<View style={styles.goodsItem_price}>
					<Text style={styles.goodsItem_price_text}>{data.price}</Text>
				</View>
				<TouchableOpacity style={styles.goodsItem_delete} onPress={this.deleteClothing.bind(this)}>
					<Icon name="minuscircleo" size={18} color="#fb9dd0" />
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	goodsItem: {
		flexDirection: 'row',
		height: 50,
		borderBottomColor: '#dbdbdb',
		borderBottomWidth: 0.5,
	},
	goodsItem_name: {
		flex: 1,
		justifyContent: 'center',
	},
	goodsItem_price: {
		width: 60,
		justifyContent: 'center',
		alignItems: 'center',
	},
	goodsItem_delete: {
		width: 60,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
