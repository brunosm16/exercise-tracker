import React, { useState, useContext, useEffect } from 'react';
import ExercisesFilter from './ExercisesFilter';
import ExercisesList from './ExercisesList';
import ExercisesChart from './ExercisesChart';
import styles from './Exercises.module.css';
import ExercisesContext from '../../context/exercises-context';
import UseHttp from '../../hooks/use-http';
import { convertListDateToJs } from '../../utils/Utils';

const Exercises = () => {
	const [filteredLevel, setFilteredLevel] = useState('Easy');
	const exercisesCtx = useContext(ExercisesContext);

	const transformExercises = (data) => {
		/* Before set exercises State, convert each data to JS */
		const convertedExercises = convertListDateToJs(data);

		convertedExercises.forEach((exercise) => {
			exercisesCtx.onAddExercise(exercise);
		});
	};

	const {
		isLoading,
		requestError,
		sendRequest: fetchExercises,
	} = UseHttp(
		{
			url: `http://localhost:3000/exercises`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		},
		transformExercises
	);

	useEffect(() => {
		fetchExercises();
	}, [fetchExercises]);

	const itemsByLevel = exercisesCtx.exercises.filter(
		(exercise) => exercise.level === filteredLevel
	);

	const handleSelectedFilter = (filter) => {
		setFilteredLevel(filter);
	};

	let contentList;

	if (isLoading) {
		contentList = <p className={styles.msg}>Loading...</p>;
	}

	if (requestError) {
		contentList = (
			<p className={`${styles.msg} ${styles['error-msg']}`}>
				An error occurred while trying to proccess exercises
			</p>
		);
	}

	if (!requestError && !isLoading) {
		contentList = <p className={styles.msg}>No exercises found</p>;

		if (itemsByLevel.length > 0) {
			contentList = <ExercisesList exercises={itemsByLevel} />;
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
				{contentList}
			</div>
		</>
	);
};

export default Exercises;
