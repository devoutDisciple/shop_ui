/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	Dimensions,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import Toast from './Toast';
const { width, height } = Dimensions.get('window');

export default class Dialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	onChangeText(key, value) {
		let params = {};
		params[key] = value;
		this.setState(params);
	}

	onSurePrice() {
		let state = this.state;
		if (!state || !state.name || !state.price) {
			return Toast.warning('请输入正确衣物信息');
		}
		var re = /^[0-9]+.?[0-9]*/;
		if (!re.test(state.price) || Number(state.price < 0)) {
			return Toast.warning('请录入正确价格');
		}
		this.props.onAddClothingType(this.state);
	}

	render() {
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView style={styles.content} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
					<View style={styles.content_title}>
						<Text
							style={{
								color: '#333',
								fontSize: 16,
								fontWeight: '700',
							}}
						>
							衣物录入
						</Text>
					</View>
					<View style={styles.content_desc}>
						<TextInput
							maxLength={20}
							selectionColor="#fb9bcd"
							placeholderTextColor="#bfbfbf"
							style={styles.message_edit_input}
							placeholder="请输入衣物名称"
							onChangeText={this.onChangeText.bind(this, 'name')}
						/>
					</View>
					<View style={styles.content_desc}>
						<TextInput
							maxLength={10}
							placeholder="请输入衣物价格"
							selectionColor="#fb9bcd"
							placeholderTextColor="#bfbfbf"
							keyboardType="number-pad"
							style={styles.message_edit_input}
							onChangeText={this.onChangeText.bind(this, 'price')}
						/>
					</View>
					<View style={styles.content_footer}>
						<TouchableOpacity onPress={this.onSurePrice.bind(this)} style={styles.content_footer_left}>
							<Text style={styles.content_footer_text}>确定</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.props.onCancel()} style={styles.content_footer_right}>
							<Text style={styles.content_footer_text}>取消</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: width,
		height: height,
		backgroundColor: 'rgba(204,204,204,0.5)',
		position: 'absolute',
	},
	content: {
		minHeight: 40,
		width: width * 0.8,
		marginLeft: width / 10,
		marginTop: height / 2 - 120,
		opacity: 1,
		backgroundColor: 'rgba(255,255,255,1)',
		borderRadius: 10,
		overflow: 'hidden',
	},
	content_title: {
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content_desc: {
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'red',
		marginTop: -10,
	},
	message_edit_input: {
		height: 35,
		width: width * 0.7,
		fontSize: 14,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		borderColor: '#cdcdcd',
		borderWidth: 0.5,
		borderRadius: 5,
	},
	content_footer: {
		flexDirection: 'row',
		height: 40,
	},
	content_footer_text: {
		color: '#2d8afd',
		fontSize: 16,
		fontWeight: '700',
	},
	content_footer_left: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#cdcdcd',
		borderWidth: 0.5,
		borderLeftWidth: 0,
		borderBottomWidth: 0,
	},
	content_footer_right: {
		flex: 1,
		justifyContent: 'center',
		borderTopColor: '#cdcdcd',
		borderTopWidth: 0.5,
		alignItems: 'center',
	},
});
