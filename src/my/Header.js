import React from 'react';
import FilterStatus from '../util/FilterStatus';
import Config from '../config/config';
import FastImage from '../component/FastImage';
import { Text, View, StyleSheet } from 'react-native';

export default class MyScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		let { shopDetail, userDetail } = this.props;
		return (
			<View style={styles.my_header}>
				<View style={styles.my_header_img_container}>
					<FastImage style={styles.my_header_image} source={{ uri: `${Config.baseUrl}/${shopDetail.url}` }} />
				</View>
				<View style={styles.my_header_message}>
					<View style={styles.my_header_message_name}>
						<Text style={styles.my_header_message_name_left_text}>{shopDetail.name}</Text>
					</View>
					<View style={styles.my_header_message_member}>
						<Text style={styles.my_header_message_member_text}>角色:{'  '}</Text>
						<Text style={styles.my_header_message_member_text}>
							{FilterStatus.filterRoleStatus(userDetail.role)}
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
		// paddingHorizontal: 9,
		backgroundColor: '#fb9dd0',
		marginLeft: 15,
		flexDirection: 'row',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		width: 120,
	},
	my_header_message_member_text: {
		fontSize: 13,
		color: '#fff',
	},
});
