import PropTypes from 'prop-types';
import List from '../UI/List/List';
import ExerciseItem from './ExerciseItem';
import styles from './ExercisesList.module.css';

const ExercisesList = ({ exercises, level }) => (
		<List cssClass={styles.list}>
			{exercises.length === 0 && (
				<p className={styles['empty-list-msg']}>
					No exercises was found with level <strong>{level}</strong>
				</p>
			)}
			{exercises.length !== 0 &&
				exercises.map((exercise) => (
					<ExerciseItem
						key={exercise.id}
						id={exercise.id}
						name={exercise.name}
						level={exercise.level}
						date={exercise.date}
					/>
				))}
		</List>
	);

ExercisesList.defaultProps = {
	exercises: [],
	level: '',
};

ExercisesList.propTypes = {
	exercises: PropTypes.arrayOf(PropTypes.object),
	level: PropTypes.string,
};

export default ExercisesList;
