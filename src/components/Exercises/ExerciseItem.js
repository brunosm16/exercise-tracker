import PropTypes from 'prop-types';
import ExerciseDate from './ExerciseDate';
import styles from './ExerciseItem.module.css';

const ExerciseItem = ({ name, level, date }) => (
	<li className={styles.item}>
		<div className={styles.info}>
			<p>{name}</p>
			<p>{level}</p>
		</div>

		<ExerciseDate date={date} />
	</li>
);

ExerciseItem.defaultProps = {
	name: '',
	level: '',
	date: '',
};

ExerciseItem.propTypes = {
	name: PropTypes.string,
	level: PropTypes.string,
	date: PropTypes.objectOf(PropTypes.object),
};

export default ExerciseItem;
