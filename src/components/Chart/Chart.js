import styled from 'styled-components';
import PropTypes from 'prop-types';
import ChartBar from './ChartBar';

const ChartDiv = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem;
	align-items: center;
	justify-content: center;
	width: 100%;

	@media screen and (min-width: 768px) {
		display: flex;
		flex-direction: row;
		margin: 2rem;
	}
`;

const Chart = ({ dataPoints, maxValue }) => (
	<ChartDiv>
		{dataPoints.map((dataPoint) => (
			<ChartBar
				key={dataPoint.label}
				label={dataPoint.label}
				value={dataPoint.value}
				maxValue={maxValue}
			/>
		))}
	</ChartDiv>
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
