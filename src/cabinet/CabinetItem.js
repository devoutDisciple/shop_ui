/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import CommonStyle from '../style/common';
import { Text, View, StyleSheet } from 'react-native';
import FastImage from '../component/FastImage';
import config from '../config/config';
import { Badge } from 'react-native-elements';
import Request from '../util/Request';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Message from '../component/Message';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	async openCell(type) {
		try {
			this.props.setLoading(true);
			let { navigation, data } = this.props;
			let orderId = navigation.getParam('orderId');
			let cabinetId = data.id;
			let res = await Request.post('/order/openCellByRandomByCabinetId', {
				orderId: orderId,
				cabinetId: cabinetId,
				type: type,
				status: 3,
			});
			this.props.setLoading(false);
			if (res.data === 'success') {
				this.props.onSearch();
				Message.success('格口已打开', '请存放衣物，并随手关闭格口', () => {
					navigation.navigate('HomeScreen');
				});
			}
		} catch (error) {
			this.props.setLoading(false);
		}
	}

	render() {
		let { data, navigation } = this.props;
		let showCabinetBtn = navigation.getParam('showCabinetBtn');
		let bigBoxCells = (data.usedState && data.usedState.bigBox && data.usedState.bigBox.empty) || 0;
		let smallBoxCells = (data.usedState && data.usedState.samllBox && data.usedState.samllBox.empty) || 0;
		return (
			<View style={styles.container}>
				<View style={styles.detail_common_title}>
					<Text style={{ fontSize: 16, color: '#333' }}>{data.name}</Text>
				</View>

				<View style={styles.cabinet}>
					<View style={styles.cabinet_detail}>
						<View style={styles.cabinet_detail_img}>
							<FastImage
								style={styles.img}
								source={{
									uri: `${config.baseUrl}/${data.url}`,
								}}
							/>
						</View>
						<View style={styles.cabinet_detail_address}>
							<Text style={styles.cabinet_detail_address_text}>位置: {data.address}</Text>
							<Text style={styles.cabinet_detail_address_text}>boxId: {data.boxid}</Text>
							<View style={{ flexDirection: 'row' }}>
								<Badge status="success" value={`可用格口：${data.abledNum || 0}`} options="left" />
								<Badge status="warning" value={`使用中：${data.usedNum || 0}`} options="left" />
							</View>
						</View>
					</View>
					{showCabinetBtn && (
						<View style={styles.cabinet_bottom}>
							<TouchableOpacity style={styles.bottom_btn} onPress={this.openCell.bind(this, 'smallBox')}>
								<Text style={{ color: '#fb9dd0' }}>叠柜(可用: {smallBoxCells})</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.bottom_btn} onPress={this.openCell.bind(this, 'bigBox')}>
								<Text style={{ color: '#fb9dd0' }}>挂柜(可用: {bigBoxCells})</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	detail_common_title: CommonStyle.detail_common_title,
	container: {
		marginBottom: 10,
	},
	cabinet: {
		height: 135,
		borderWidth: 0.5,
		borderColor: '#dbdbdb',
		padding: 10,
	},
	cabinet_detail: {
		height: 90,
		flexDirection: 'row',
		// backgroundColor: 'red',
	},
	cabinet_detail_img: {
		height: 80,
		width: 90,
	},
	cabinet_detail_address: {
		flex: 1,
	},
	cabinet_detail_address_text: {
		fontSize: 14,
		color: '#434343',
		marginBottom: 5,
	},
	img: {
		height: 80,
		width: 80,
	},
	cabinet_bottom: {
		height: 30,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	bottom_btn: {
		padding: 5,
		width: 110,
		borderWidth: 0.5,
		borderColor: '#fb9dd0',
		alignItems: 'center',
		borderRadius: 5,
		marginHorizontal: 5,
	},
});
