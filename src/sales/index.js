/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Request from '../util/Request';
import CommonSylte from '../style/common';
import CommonHeader from '../component/CommonHeader';
import Storage from '../util/Storage';
import { View, StyleSheet, processColor } from 'react-native';
import Loading from '../component/Loading';
import SafeViewComponent from '../component/SafeViewComponent';
import { PieChart } from 'react-native-charts-wrapper';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingVisible: false,
			legend: {
				enabled: true,
				textSize: 15,
				form: 'CIRCLE',

				horizontalAlignment: 'RIGHT',
				verticalAlignment: 'CENTER',
				orientation: 'VERTICAL',
				wordWrapEnabled: true,
			},
			data: {
				dataSets: [
					{
						values: [
							{ value: 45, label: 'Sandwiches' },
							{ value: 21, label: 'Salads' },
							{ value: 15, label: 'Soup' },
							{ value: 9, label: 'Beverages' },
							{ value: 15, label: 'Desserts' },
						],
						label: 'Pie dataset',
						config: {
							colors: [
								processColor('#C0FF8C'),
								processColor('#FFF78C'),
								processColor('#FFD08C'),
								processColor('#8CEAFF'),
								processColor('#FF8C9D'),
							],
							valueTextSize: 20,
							valueTextColor: processColor('green'),
							sliceSpace: 5,
							selectionShift: 13,
							// xValuePosition: "OUTSIDE_SLICE",
							// yValuePosition: "OUTSIDE_SLICE",
							valueFormatter: "#.#'%'",
							valueLineColor: processColor('green'),
							valueLinePart1Length: 0.5,
						},
					},
				],
			},
			highlights: [{ x: 2 }],
			description: {
				text: 'This is Pie chart description',
				textSize: 15,
				textColor: processColor('darkgray'),
			},
		};
	}

	async componentDidMount() {}

	handleSelect(event) {
		let entry = event.nativeEvent;
		if (entry == null) {
			this.setState({ ...this.state, selectedEntry: null });
		} else {
			this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
		}

		console.log(event.nativeEvent);
	}

	render() {
		const { navigation } = this.props;
		const { loadingVisible } = this.state;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="销售额统计" navigation={navigation} />
					<PieChart
						style={styles.chart}
						logEnabled={true}
						chartBackgroundColor={processColor('pink')}
						chartDescription={this.state.description}
						data={this.state.data}
						legend={this.state.legend}
						highlights={this.state.highlights}
						entryLabelColor={processColor('green')}
						entryLabelTextSize={20}
						drawEntryLabels={true}
						rotationEnabled={true}
						rotationAngle={45}
						usePercentValues={true}
						styledCenterText={{ text: 'Pie center text!', color: processColor('pink'), size: 20 }}
						centerTextRadiusPercent={100}
						holeRadius={40}
						holeColor={processColor('#f0f0f0')}
						transparentCircleRadius={45}
						transparentCircleColor={processColor('#f0f0f088')}
						maxAngle={350}
						onSelect={this.handleSelect.bind(this)}
						onChange={event => console.log(event.nativeEvent)}
					/>
				</View>
				<Loading visible={loadingVisible} />
			</SafeViewComponent>
		);
	}
}

const styles = StyleSheet.create({
	detail_common_title: CommonSylte.detail_common_title,
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 10,
		marginBottom: 10,
	},
	chart: {
		height: 300,
		width: 300,
	},
});
