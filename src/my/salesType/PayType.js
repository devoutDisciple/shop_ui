/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { PieChart } from 'react-native-charts-wrapper';
import Description from './Description';
import { StyleSheet, processColor, View, Text } from 'react-native';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		this.renderPie();
	}

	handleSelect(event) {
		let entry = event.nativeEvent;
		if (entry == null) {
			this.setState({ ...this.state, selectedEntry: null });
		} else {
			this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
		}

		console.log(event.nativeEvent);
	}

	renderPie() {
		this.setState({
			legend: {
				enabled: true,
				textSize: 12,
				form: 'CIRCLE',
				horizontalAlignment: 'RIGHT',
				verticalAlignment: 'CENTER',
				orientation: 'VERTICAL',
				wordWrapEnabled: true,
			},
			data: {
				dataSets: [
					{
						values: [{ value: 45, label: '支付宝' }, { value: 21, label: '微信' }],
						label: '',
						config: {
							colors: [processColor('#1977ff'), processColor('#32ce0b')],
							valueTextSize: 12,
							valueTextColor: processColor('#333'),
							sliceSpace: 5,
							selectionShift: 11,
							valueFormatter: "#.##'%'",
							valueLinePart1Length: 0.5,
						},
					},
				],
			},
			highlights: [{ x: 2 }],
			description: {
				text: '店铺收入类型统计',
				textSize: 12,
				textColor: processColor('#8a8a8a'),
			},
		});
	}

	render() {
		return (
			<>
				<PieChart
					style={styles.pie}
					logEnabled={true}
					chartBackgroundColor={processColor('#fff')}
					chartDescription={this.state.description}
					data={this.state.data}
					legend={this.state.legend}
					highlights={this.state.highlights}
					entryLabelColor={processColor('#333')} // label的颜色
					entryLabelTextSize={12} // label字体的大小
					drawEntryLabels={true}
					rotationEnabled={true}
					rotationAngle={45} // 旋转的角度
					usePercentValues={true} // 是否用百分比
					styledCenterText={{ text: '10000', color: processColor('#8a8a8a'), size: 20 }}
					centerTextRadiusPercent={100}
					holeRadius={50}
					holeColor={processColor('#fff')}
					transparentCircleRadius={30}
					transparentCircleColor={processColor('#f0f0f088')}
					maxAngle={360}
					onSelect={this.handleSelect.bind(this)}
					onChange={event => console.log(event.nativeEvent)}
				/>
				<Description text="支付宝付款" value={1000} />
				<Description text="微信付款" value={1000} />
			</>
		);
	}
}

const styles = StyleSheet.create({
	pie: {
		height: 300,
		width: '100%',
	},
});
