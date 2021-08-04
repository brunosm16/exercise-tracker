import { useState } from 'react';
import PropTypes from 'prop-types';
import ExercisesFilter from './ExercisesFilter';
import ExercisesList from './ExercisesList';
import ExercisesChart from './ExercisesChart';
import Card from '../UI/Card/Card';
import styles from './Exercises.module.css';

const Exercises = ({ items }) => {
	const [filteredLevel, setFilteredLevel] = useState('Easy');

	const itemsByLevel = items.filter(
		(exercise) => exercise.level === filteredLevel
	);

	const handleSelectedFilter = (filter) => {
		setFilteredLevel(filter);
	};

	return (
		<Card cssClass={styles.exercises}>
			<ExercisesFilter
				onSelectedFilter={handleSelectedFilter}
				select={filteredLevel}
			/>

			<ExercisesChart exercises={itemsByLevel} />

			<ExercisesList exercises={itemsByLevel} level={filteredLevel} />
		</Card>
	);
};

Exercises.defaultProps = {
	items: [],
};

Exercises.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
};

export default Exercises;
