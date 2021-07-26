import PropTypes from 'prop-types';
import ChartBar from './ChartBar';
import './Chart.css';

const Chart = ({ dataPoints, maxValue }) => (
	<div className="chart">
		{dataPoints.map((dataPoint) => (
			<ChartBar
				key={dataPoint.label}
				label={dataPoint.label}
				value={dataPoint.value}
				maxValue={maxValue}
			/>
		))}
	</div>
);

Chart.defaultProps = {
	dataPoints: [],
	maxValue: 0,
};

Chart.propTypes = {
	dataPoints: PropTypes.arrayOf(PropTypes.object),
	maxValue: PropTypes.number,
};

export default Chart;
