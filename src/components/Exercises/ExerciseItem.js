import PropTypes from 'prop-types';
import ExerciseDate from './ExerciseDate';
import styles from './ExerciseItem.module.css';

const ExerciseItem = ({ name, level, date }) => (
	<li className={styles['exercise-item']}>
		<div className={styles['exercise-item__info']}>
			<div className={styles['exercise-item__name']}>
				<p>{name}</p>
			</div>

			<div className={styles['exercise-item__level']}>
				<p>{level}</p>
			</div>
		</div>

		<ExerciseDate date={date} />
	</li>
);

ExerciseItem.defaultProps = {
	name: '',
	level: '',
	date: new Date(),
};

ExerciseItem.propTypes = {
	name: PropTypes.string,
	level: PropTypes.string,
	date: PropTypes.objectOf(PropTypes.object),
};

export default ExerciseItem;
