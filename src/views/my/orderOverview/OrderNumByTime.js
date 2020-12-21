import React from 'react';
import { LineChart } from 'react-native-charts-wrapper';
import { StyleSheet, processColor } from 'react-native';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},

			marker: {
				// enabled: true,
				// digits: 2,
				backgroundTint: processColor('teal'),
				markerColor: processColor('#F0C0FF8C'),
				textColor: processColor('white'),
			},
			xAxis: {
				// granularityEnabled: true,
				granularity: 1,
			},
		};
	}

	async componentDidMount() {
		this.renderPie();
	}

	renderPie() {
		this.setState({
			data: {
				dataSets: [
					{
						values: [
							{ x: 1, y: 135 },
							{ x: 2, y: 100 },
							{ x: 3, y: 800 },
							{ x: 4, y: 500 },
							{ x: 5, y: 600 },
							{ x: 6, y: 900 },
							{ x: 7, y: 1000 },
						],
						label: '订单量',
					},
				],
			},
		});
	}

	render() {
		return (
			<>
				<LineChart
					style={styles.line}
					data={this.state.data}
					chartDescription={{ text: '' }}
					legend={this.state.legend}
					marker={this.state.marker}
					xAxis={this.state.xAxis}
					drawGridBackground={false}
					borderColor={processColor('teal')}
					borderWidth={0.5}
					drawBorders={true}
					autoScaleMinMaxEnabled={false}
					touchEnabled={true}
					dragEnabled={true}
					scaleEnabled={true}
					scaleXEnabled={true}
					scaleYEnabled={true}
					pinchZoom={false}
					doubleTapToZoomEnabled={false}
					highlightPerTapEnabled={true}
					highlightPerDragEnabled={false}
					// visibleRange={this.state.visibleRange}
					dragDecelerationEnabled={true}
					dragDecelerationFrictionCoef={0.2}
					keepPositionOnRotation={false}
				/>
			</>
		);
	}
}

const styles = StyleSheet.create({
	line: {
		height: 300,
		width: '100%',
	},
});
