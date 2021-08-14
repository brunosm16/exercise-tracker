import { useState, useContext } from 'react';
import ExercisesFilter from './ExercisesFilter';
import ExercisesList from './ExercisesList';
import ExercisesChart from './ExercisesChart';
import styles from './Exercises.module.css';
import ExercisesContext from '../../context/exercises-context';

const Exercises = () => {
	const [filteredLevel, setFilteredLevel] = useState('Easy');

	const exercisesCtx = useContext(ExercisesContext);


	const itemsByLevel = exercisesCtx.exercises.filter(
		(exercise) => exercise.level === filteredLevel
	);


	const handleSelectedFilter = (filter) => {
		setFilteredLevel(filter);
	};

	return (
		<div className={styles.exercises}>
			<ExercisesFilter
				onSelectedFilter={handleSelectedFilter}
				select={filteredLevel}
			/>

			<ExercisesChart exercises={itemsByLevel} />

			<ExercisesList exercises={itemsByLevel} level={filteredLevel} />
		</div>
	);
};

export default Exercises;
