import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { convertListDateToJs } from '../utils/Utils';

const ExercisesContext = React.createContext({
	editId: null,
	exercises: [],
	options: [],
	// eslint-disable-next-line no-unused-vars
	onSelectOperation: (itemId, isDelete) => {},
	// eslint-disable-next-line no-unused-vars
	onAddExercise: (data) => {},
	onResetId: () => {},
});

const URL = 'http://localhost:3000/';

export const ExercisesContextProvider = ({ children }) => {
	const [exercises, setExercises] = useState([]);
	const [exercisesLevels, setExercisesLevels] = useState([]);

	// ID of Exercise to be edited,
	// if NULL, operation is not edit
	const [editId, setEditId] = useState();

	// todo - Fetch exercises from server
	const fetchExercises = () => {
		fetch(`${URL}exercises`)
			.then((response) => response.json())
			.then((data) => {
				/* Before set exercises State, convert each data to JS */
				const convertedExercises = convertListDateToJs(data);
				setExercises(convertedExercises);
			});
	};

	const fetchExercisesLevels = () => {
		fetch(`${URL}exercises_levels`)
			.then((response) => response.json())
			.then((data) => {
				/* Extract the levels from JSON */
				const levels = data.map((currLevel) => currLevel.level);

				setExercisesLevels(levels);
			});
	};

	/* Fetch data from server on page load */
	useEffect(() => {
		fetchExercises();
		fetchExercisesLevels();
	}, []);

	const updateExercises = (updated) =>
		exercises.map((e) => {
			let current = e;

			if (current.id === updated.id) {
				current = updated;
			}

			return current;
		});

	/**
	 * Set editId to null.
	 */
	const handleResetId = () => {
		setEditId(null);
	};

	const handleAddExercise = (data) => {
		// Edit operation
		if (editId) {
			// Reset editId
			handleResetId(null);
			return setExercises(updateExercises(data));
		}

		// Insert operation
		return setExercises((previousData) => [data, ...previousData]);
	};

	const deleteExercise = (id) => {
		setExercises((previousData) =>
			previousData.filter((exercise) => exercise.id !== id)
		);
	};

	const handleOperation = (itemId, isDelete) =>
		isDelete ? deleteExercise(itemId) : setEditId(itemId);

	return (
		<ExercisesContext.Provider
			value={{
				editId,
				exercises,
				options: exercisesLevels,
				onAddExercise: handleAddExercise,
				onSelectOperation: handleOperation,
				onResetId: handleResetId,
			}}
		>
			{children}
		</ExercisesContext.Provider>
	);
};

ExercisesContextProvider.defaultProps = {
	children: {},
};

ExercisesContextProvider.propTypes = {
	children: PropTypes.node,
};

export default ExercisesContext;
