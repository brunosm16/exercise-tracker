import PropTypes from 'prop-types';
import './ExerciseDate.css'

const ExerciseDate = ({ date }) => {
	const year = date.getFullYear();
	const month = date.toLocaleString('en-US', { month: 'long' });
	const day = date.toLocaleString('en-US', { day: '2-digit' });
	return (
		<div className="exercise-date">
			<p className="exercise-date__year">{year}</p>
			<p className="exercise-date__month">{month}</p>
			<p className="exercise-date__day">{day}</p>
		</div>
	);
};

ExerciseDate.defaultProps = {
	date: new Date(),
};

ExerciseDate.propTypes = {
	date: PropTypes.objectOf(PropTypes.object),
};

export default ExerciseDate;
