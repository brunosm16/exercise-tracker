import React, { useState, useContext } from 'react';
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

	/* Content to be rendered */
	let content;

	if (exercisesCtx.isLoading) {
		content = <p className={styles.msg}>Loading...</p>;
	}

	if (exercisesCtx.requestError) {
		content = (
			<p className={`${styles.msg} ${styles['error-msg']}`}>
				{exercisesCtx.requestError}
			</p>
		);
	}

	if (exercisesCtx.exercises) {
		let contentList = <p className={styles.msg}>No exercises found</p>;

		if (itemsByLevel.length > 0) {
			contentList = <ExercisesList exercises={itemsByLevel} />;
		}

		content = (
			<div className={styles.exercises}>
				<ExercisesFilter
					onSelectedFilter={handleSelectedFilter}
					select={filteredLevel}
				/>

				<ExercisesChart exercises={itemsByLevel} />

				{contentList}
			</div>
		);
	}

	return <>{content}</>;
};

export default Exercises;
