import PropTypes from 'prop-types';
import ChartBar from './ChartBar';
import styles from './Chart.module.css';

const Chart = ({ dataPoints, maxValue }) => (
	<div className={styles['chart-container']}>
		{dataPoints.map((dataPoint) => (
			<ChartBar
				key={dataPoint.title}
				title={dataPoint.title}
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
