import PropTypes from 'prop-types';
import styles from './ExerciseDate.module.css';

const ExerciseDate = ({ date }) => {
	const year = date.getFullYear();
	const month = date.toLocaleString('en-US', { month: 'long' });
	const day = date.toLocaleString('en-US', { day: '2-digit' });
	return (
		<div className={styles['exercise-date']}>
			<p className={styles['exercise-date__year']}>{year}</p>
			<p className={styles['exercise-date__month']}>{month}</p>
			<p className={styles['exercise-date__day']}>{day}</p>
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
