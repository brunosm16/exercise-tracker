import { useState } from 'react';
import PropTypes from 'prop-types';
import ExercisesFilter from './ExercisesFilter';
import ExercisesList from './ExercisesList';
import ExercisesChart from './ExercisesChart';
import styles from './Exercises.module.css';

const Exercises = ({ items, levels, onSelectedOperation }) => {
	const [filteredLevel, setFilteredLevel] = useState('Easy');

	const itemsByLevel = items.filter(
		(exercise) => exercise.level === filteredLevel
	);

	const handleSelectedFilter = (filter) => {
		setFilteredLevel(filter);
	};

	const handleOperation = (itemId, isDelete) => {
		onSelectedOperation(itemId, isDelete);
	};

	return (
		<div className={styles.exercises}>
			<ExercisesFilter
				onSelectedFilter={handleSelectedFilter}
				select={filteredLevel}
				levelOptions={levels}
			/>

			<ExercisesChart exercises={itemsByLevel} />

			<ExercisesList
				exercises={itemsByLevel}
				level={filteredLevel}
				onOperation={handleOperation}
			/>
		</div>
	);
};

Exercises.defaultProps = {
	items: [],
	levels: [],
	onSelectedOperation: () => {},
};

Exercises.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
	levels: PropTypes.arrayOf(PropTypes.array),
	onSelectedOperation: PropTypes.func,
};

export default Exercises;
