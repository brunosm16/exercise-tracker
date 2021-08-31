import React, { useState, useContext } from 'react';
import ExercisesFilter from './ExercisesFilter';
import ExercisesList from './ExercisesList';
import ExercisesChart from './ExercisesChart';
import styles from './Exercises.module.css';
import ExercisesContext from '../../context/exercises-context';

const Exercises = () => {
	const [filteredLevel, setFilteredLevel] = useState('Easy');

	const { exercises, isLoading, requestError } = useContext(ExercisesContext);

	const itemsByLevel = exercises.filter(
		(exercise) => exercise.level === filteredLevel
	);

	const handleSelectedFilter = (filter) => {
		setFilteredLevel(filter);
	};

	/* Content to be rendered */
	let exercisesList;

	if (isLoading) {
		exercisesList = <p className={styles.msg}>Loading...</p>;
	}

	if (requestError) {
		console.log(requestError);
		exercisesList = (
			<p className={`${styles.msg} ${styles['error-msg']}`}>
				An error occurred while trying to load exercises
			</p>
		);
	}

	if (exercises && !requestError && !isLoading) {
		if (itemsByLevel.length === 0) {
			exercisesList = <p className={styles.msg}>No exercises found</p>;
		}

		if (itemsByLevel.length > 0) {
			exercisesList = <ExercisesList exercises={itemsByLevel} />;
		}
	}

	return (
		<>
			<div className={styles.exercises}>
				<ExercisesFilter
					onSelectedFilter={handleSelectedFilter}
					select={filteredLevel}
				/>

				<ExercisesChart exercises={itemsByLevel} />

				{exercisesList}
			</div>
		</>
	);
};

export default Exercises;
