import { useState } from 'react';
import PropTypes from 'prop-types';
import ExercisesFilter from './ExercisesFilter';
import ExercisesList from './ExercisesList';
import ExercisesChart from './ExercisesChart';
import styles from './Exercises.module.css';

const Exercises = ({ items, levels, onSelectOperation }) => {
	const [filteredLevel, setFilteredLevel] = useState('Easy');

	const itemsByLevel = items.filter(
		(exercise) => exercise.level === filteredLevel
	);

	const handleSelectedFilter = (filter) => {
		setFilteredLevel(filter);
	};

	const handleOperation = (itemId, isDelete) => {
		onSelectOperation(itemId, isDelete);
	};

	return (
		<div className={styles.exercises}>
			<ExercisesFilter
				onSelectedFilter={handleSelectedFilter}
				select={filteredLevel}
				options={levels}
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
	onSelectOperation: () => {},
};

Exercises.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
	levels: PropTypes.arrayOf(PropTypes.string),
	onSelectOperation: PropTypes.func,
};

export default Exercises;
