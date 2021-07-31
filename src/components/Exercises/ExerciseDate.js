import styled from 'styled-components';
import PropTypes from 'prop-types';

const DateDiv = styled.div`
	background-color: #448fa3;
	width: 7rem;
	border-radius: 15px;
	text-align: center;
	margin-bottom: 1rem;
`;

const ExerciseDate = ({ date }) => {
	const year = date.getFullYear();
	const month = date.toLocaleString('en-US', { month: 'long' });
	const day = date.toLocaleString('en-US', { day: '2-digit' });
	return (
		<DateDiv>
			<p>{year}</p>
			<p>{month}</p>
			<p>{day}</p>
		</DateDiv>
	);
};

ExerciseDate.defaultProps = {
	date: new Date(),
};

ExerciseDate.propTypes = {
	date: PropTypes.objectOf(PropTypes.object),
};

export default ExerciseDate;
