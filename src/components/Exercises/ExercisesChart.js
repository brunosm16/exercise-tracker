import styled from 'styled-components';
import PropTypes from 'prop-types';
import Chart from '../Chart/Chart';

const ExercisesChartDiv = styled.div`
	background-color: #0f8b8d;
	color: #fff;
	font-weight: bold;
	width: 90%;
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 1rem;

	@media screen and (min-width: 768px) {
		height: 15rem;
	}
`;

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
		<ExercisesChartDiv>
			<Chart dataPoints={dataPoints} maxValue={max} />
		</ExercisesChartDiv>
	);
};

ExercisesChart.defaultProps = {
	exercises: [],
};

ExercisesChart.propTypes = {
	exercises: PropTypes.arrayOf(PropTypes.object),
};

export default ExercisesChart;
