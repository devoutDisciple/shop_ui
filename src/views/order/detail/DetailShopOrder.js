import React from 'react';
import CommonShow from './CommonShow';
import Request from '@/util/Request';
import CommonSylte from '@/style/common';
import FilterStatus from '@/util/FilterStatus';
import { Text, View, StyleSheet } from 'react-native';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: {},
		};
	}

	async componentDidMount() {
		await this.getUserDefaultAddress();
	}

	// 获取用户默认地址
	async getUserDefaultAddress() {
		let { orderDetail } = this.props;
		let userid = orderDetail && orderDetail.userDetail && orderDetail.userDetail.id;
		if (!userid) {
			return;
		}
		let address = await Request.get('/address/getUserDefaultAddress', { userid });
		this.setState({ address: address.data || {} });
	}

	render() {
		let { orderDetail } = this.props;
		let { address } = this.state;
		return (
			<View style={styles.detail_send}>
				<View style={styles.detail_common_title}>
					<Text>取货信息</Text>
				</View>
				<View style={styles.detail_send_content}>
					<CommonShow label="取货方式" value={FilterStatus.filterSendStatus(orderDetail.send_status)} />
					{orderDetail.send_status === 1 && address.area ? (
						<>
							<CommonShow label="送达地址" value={`${address.area} ${address.street}`} />
							<CommonShow label="联系人" value={address.username} />
							<CommonShow label="联系电话" value={address.phone} />
						</>
					) : null}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	detail_common_title: CommonSylte.detail_common_title,
	detail_send: {
		backgroundColor: '#fff',
		marginTop: 10,
		padding: 10,
		borderRadius: 5,
	},
	detail_send_content_item: {
		flexDirection: 'row',
		marginBottom: 10,
		marginLeft: 20,
	},
	detail_send_content_item_label: {
		width: 80,
		lineHeight: 20,
	},
	detail_send_content_item_text: {
		flex: 1,
		color: '#8a8a8a',
		lineHeight: 20,
	},
});
