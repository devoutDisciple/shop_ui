import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
const { width } = Dimensions.get('window');

export default class MyScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	render() {
		let { title, iconName } = this.props;
		return (
			<TouchableOpacity style={styles.chunk} onPress={() => this.props.onPress()}>
				<View style={styles[this.props.className]}>
					<View style={styles.sales_chunk_icon}>
						<Icon name={iconName} size={28} color="#e6f7fe" />
					</View>
					<View style={styles.sales_chunk_title}>
						<Text style={styles.sales_chunk_title_text}>{title}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

let itemWidth = (width - 37) / 3;
const sales_chunk = {
	width: itemWidth,
	height: 100,
	borderColor: '#dbdbdb',
	borderWidth: 0.5,
	backgroundColor: '#fb9dd0',
};
// 展示头像的view高度
const styles = StyleSheet.create({
	chunk: {
		width: itemWidth,
		height: 100,
		marginLeft: 5,
		marginBottom: 10,
		borderColor: '#dbdbdb',
		borderWidth: 0.5,
	},
	sales_chunk1: {
		...sales_chunk,
		backgroundColor: '#166cd9',
	},
	sales_chunk2: {
		...sales_chunk,
		backgroundColor: '#2fc2c2',
	},
	sales_chunk3: {
		...sales_chunk,
		backgroundColor: '#52c41b',
	},
	sales_chunk4: {
		...sales_chunk,
		backgroundColor: '#f759ab',
	},
	sales_chunk_icon: {
		height: 70,
		justifyContent: 'center',
		alignItems: 'center',
	},
	sales_chunk_title: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	sales_chunk_title_text: {
		fontSize: 14,
		color: '#fff',
	},
	sales_chunk_num: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	sales_chunk_num_text: {
		fontSize: 20,
		color: '#fff',
		fontWeight: '700',
	},
});
