/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import CommonStyle from '../style/common';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import FastImage from '../component/FastImage';
import config from '../config/config';

const { width } = Dimensions.get('window');

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { data } = this.props;
		console.log(data, 11);
		return (
			<View>
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
						</View>
					</View>
					<View style={styles.cabinet_chunk}>
						<View style={styles.cabinet_chunk_left}>
							<View style={styles.cabinet_chunk_title}>
								<Text style={styles.cabinet_chunk_title_text}>使用中</Text>
							</View>
							<View style={styles.cabinet_chunk_num}>
								<Text style={styles.cabinet_chunk_num_text}>{data.usedNum || 0}</Text>
							</View>
						</View>
						<View style={styles.cabinet_chunk_right}>
							<View style={styles.cabinet_chunk_title}>
								<Text style={styles.cabinet_chunk_title_text}>空闲中</Text>
							</View>
							<View style={styles.cabinet_chunk_num}>
								<Text style={styles.cabinet_chunk_num_text}>{data.abledNum || 0}</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	detail_common_title: CommonStyle.detail_common_title,
	cabinet: {
		height: 170,
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
	cabinet_chunk: {
		marginTop: 10,
		height: 50,
		borderWidth: 0.5,
		borderColor: '#dbdbdb',
		flexDirection: 'row',
	},
	cabinet_chunk_left: {
		width: '50%',
		backgroundColor: '#52c41b',
	},
	cabinet_chunk_right: {
		width: '50%',
		backgroundColor: '#40a9ff',
	},
	cabinet_chunk_title: {
		height: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cabinet_chunk_title_text: {
		color: '#fff',
		fontSize: 16,
	},
	cabinet_chunk_num: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	cabinet_chunk_num_text: {
		color: '#fff',
		fontSize: 24,
		fontWeight: '600',
	},
});
