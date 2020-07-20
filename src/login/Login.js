/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Kohana } from 'react-native-textinput-effects';
import { baseColor, commonInputParams } from './commonParams';
import Storage from '../util/Storage';
import Request from '../util/Request';
import SafeViewComponent from '../component/SafeViewComponent';

export default class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginBtnDisable: true,
			timeNumVisible: false,
			username: '', // 输入的手机号
			password: '', // 验证码
		};
	}

	// 输入框改变的时候
	inputChange(key, value) {
		let params = {};
		params[key] = value;
		this.setState(params, () => {
			let { username, password } = this.state;
			if (username && password) {
				this.setState({ loginBtnDisable: false });
			} else {
				this.setState({ loginBtnDisable: true });
			}
		});
	}

	// 点击登录按钮
	async loginBtnClick() {
		let { username, password } = this.state;
		let res = await Request.post('/account/login', {
			username,
			password,
		});
		if (res && res.code === 200) {
			await Storage.set('user', res.data || {});
			this.props.navigation.navigate('HomeScreen');
		}
	}

	goOtherPage() {
		this.props.navigation.navigate('SecurityLoginScreen');
	}

	render() {
		const { loginBtnDisable } = this.state;

		return (
			<SafeViewComponent>
				<ScrollView style={{ flex: 1, padding: 10 }}>
					<TouchableOpacity style={{ marginVertical: 20 }} />
					<View style={{ marginVertical: 20, marginLeft: 20 }}>
						<Text style={{ fontSize: 20 }}>锐动洗衣后台管理登录</Text>
					</View>
					<Kohana
						{...commonInputParams}
						iconName="user"
						label={'请输入登录账号'}
						onChangeText={this.inputChange.bind(this, 'username')}
						keyboardType="number-pad"
						maxLength={11}
						selectionColor={baseColor.fontColor}
					/>
					<Kohana
						iconName="lock"
						{...commonInputParams}
						label={'请输入登录密码'}
						onChangeText={this.inputChange.bind(this, 'password')}
						secureTextEntry={true}
						selectionColor={baseColor.fontColor}
						maxLength={20}
					/>
					{/* <View style={styles.login_desc}>
						<View style={styles.login_desc_left}>
							<View style={styles.login_desc_left_account}>
								<Text style={{ color: baseColor.shadowColor }}>如果忘记密码，请联系管理员！</Text>
							</View>
						</View>
					</View> */}
					<View style={styles.login_btn}>
						<Button
							buttonStyle={{
								backgroundColor: baseColor.heightColor,
								borderRadius: 30,
								height: 60,
							}}
							disabled={loginBtnDisable}
							disabledStyle={{
								backgroundColor: baseColor.disableColor,
							}}
							disabledTitleStyle={{ color: '#fff' }}
							onPress={this.loginBtnClick.bind(this)}
							title="登录"
						/>
					</View>
					<TouchableOpacity onPress={this.goOtherPage.bind(this, 3)} style={styles.phoneLogin}>
						<Text style={{ color: baseColor.fontColor }}>用户注册</Text>
					</TouchableOpacity>
				</ScrollView>
			</SafeViewComponent>
		);
	}
}

const styles = StyleSheet.create({
	login_desc: {
		marginVertical: 30,
		height: 50,
		flexDirection: 'row',
	},
	login_desc_left: {
		flex: 1,
		// justifyContent: 'center',
		paddingLeft: 25,
		flexDirection: 'row',
	},
	login_desc_left_account: {
		justifyContent: 'center',
	},
	login_desc_left_register: {
		flex: 1,
		justifyContent: 'center',
	},
	login_desc_right: {
		width: 80,
		justifyContent: 'center',
	},
	login_btn: {
		marginTop: 20,
		height: 90,
		// backgroundColor: 'red',
	},
	phoneLogin: {
		alignItems: 'center',
	},
});
