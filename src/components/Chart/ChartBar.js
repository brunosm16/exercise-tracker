import styled from 'styled-components';
import PropTypes from 'prop-types';

const ChartBarDiv = styled.div`
	display: flex;
	flex-direction: column-reverse;
	justify-content: center;
	align-items: center;
	width: 100%;

	@media screen and (min-width: 768px) {
		flex-direction: column;
	}
`;

const Bar = styled.div`
	display: flex;
	flex-direction: column-reverse;
	width: 95%;
	height: 8px;
	background-color: #143642;
	border-radius: 8px;

	@media screen and (min-width: 768px) {
		width: 50%;
		height: 10rem;
	}
`;

const Fill = styled.div`
	background-color: #b9faf8;
	border-radius: 8px;
	height: ${(props) => props.height};
`;

const ChartBar = ({ label, value, maxValue }) => {
	let heightToFill = '0%';

	if (maxValue > 0) {
		heightToFill = `${(value / maxValue) * 100}%`;
	}

	return (
		<ChartBarDiv>
			<Bar>
				<Fill height={heightToFill} />
			</Bar>

			<div className="chart-bar__label">
				<p>{label}</p>
			</div>
		</ChartBarDiv>
	);
};

ChartBar.defaultProps = {
	label: '',
	value: 0,
	maxValue: 0,
};

ChartBar.propTypes = {
	label: PropTypes.string,
	value: PropTypes.number,
	maxValue: PropTypes.number,
};

export default ChartBar;
