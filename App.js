/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import RouterConfig from './src/router/RouterConfig';
import { Text, TextInput } from 'react-native';

export default class App extends React.Component {
	componentDidMount() {
		TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, { allowFontScaling: false }); // 新版RN使用该方法替代
		Text.defaultProps = Object.assign({}, Text.defaultProps, { allowFontScaling: false });
	}
	render() {
		return <RouterConfig />;
	}
}
