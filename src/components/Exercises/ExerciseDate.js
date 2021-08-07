import PropTypes from 'prop-types';
import styles from './ExerciseDate.module.css';

const ExerciseDate = ({ date }) => {
	const year = date.getFullYear();
	const month = date.toLocaleString('en-US', { month: 'long' });
	const day = date.toLocaleString('en-US', { day: '2-digit' });
	return (
		<div className={styles.date}>
			<p>{year}</p>
			<p>{month}</p>
			<p>{day}</p>
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
