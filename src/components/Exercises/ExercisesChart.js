import PropTypes from 'prop-types';
import Chart from '../Chart/Chart';
import styles from './ExercisesChart.module.css';

const ExercisesChart = ({ exercises }) => {
	const dataPoints = [
		{
			title: 'Jan',
			value: 0,
		},
		{
			title: 'Feb',
			value: 0,
		},
		{
			title: 'Mar',
			value: 0,
		},
		{
			title: 'Apr',
			value: 0,
		},
		{
			title: 'May',
			value: 0,
		},
		{
			title: 'Jun',
			value: 0,
		},
		{
			title: 'Jul',
			value: 0,
		},
		{
			title: 'Aug',
			value: 0,
		},
		{
			title: 'Sep',
			value: 0,
		},
		{
			title: 'Oct',
			value: 0,
		},
		{
			title: 'Nov',
			value: 0,
		},
		{
			title: 'Dec',
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
