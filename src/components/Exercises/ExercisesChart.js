import PropTypes from 'prop-types';
import Chart from '../Chart/Chart';
import styles from './ExercisesChart.module.css';

const ExercisesChart = ({ exercises }) => {
	const dataPoints = [
		{
			label: 'Jan',
			value: 0,
		},
		{
			label: 'Feb',
			value: 0,
		},
		{
			label: 'Mar',
			value: 0,
		},
		{
			label: 'Apr',
			value: 0,
		},
		{
			label: 'May',
			value: 0,
		},
		{
			label: 'Jun',
			value: 0,
		},
		{
			label: 'Jul',
			value: 0,
		},
		{
			label: 'Aug',
			value: 0,
		},
		{
			label: 'Sep',
			value: 0,
		},
		{
			label: 'Oct',
			value: 0,
		},
		{
			label: 'Nov',
			value: 0,
		},
		{
			label: 'Dec',
			value: 0,
		},
	];

	// update dataPoints
	exercises.forEach((exercise) => {
		// sums the quantity of exercises in a month
		dataPoints[exercise.date.getMonth()].value += 1;
	});

	const values = dataPoints.map((dataPoint) => dataPoint.value);

	// get the highest number of exercises done in a month
	const max = Math.max(...values);

	return (
		<div className={styles['exercises-chart']}>
			<Chart dataPoints={dataPoints} maxValue={max} />
		</div>
	);
};

ExercisesChart.defaultProps = {
	exercises: [],
};

ExercisesChart.propTypes = {
	exercises: PropTypes.arrayOf(PropTypes.object),
};

export default ExercisesChart;
