import PropTypes from 'prop-types';
import List from '../UI/List/List';
import ExerciseItem from './ExerciseItem';
import styles from './ExercisesList.module.css';

const ExercisesList = ({ exercises }) => (
	<List cssClass={styles.list}>
		{exercises.map((exercise) => (
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
};

ExercisesList.propTypes = {
	exercises: PropTypes.arrayOf(PropTypes.object),
};

export default ExercisesList;
