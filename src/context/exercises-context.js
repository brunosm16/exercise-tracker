import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
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
	isLoading: false,
	requestError: null,
});

const URL = 'http://localhost:3000/';
const REQUEST_ERROR_MESSAGE = 'An Error occurred while processing your request';

export const ExercisesContextProvider = ({ children }) => {
	const [exercises, setExercises] = useState([]);
	const [exercisesLevels, setExercisesLevels] = useState([]);
	const [requestError, setRequestError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	// ID of Exercise to be edited,
	// if NULL, operation is not edit
	const [editId, setEditId] = useState();

	const fetchExercises = useCallback(async () => {
		/* Clear any previous errors */
		setRequestError(null);
		setIsLoading(false);

		console.log('executing');

		try {
			setIsLoading(true);
			const response = await fetch(`${URL}exercises`);

			// Error occurred
			if (!response.ok) {
				throw new Error(REQUEST_ERROR_MESSAGE);
			}

			const data = await response.json();

			/* Before set exercises State, convert each data to JS */
			const convertedExercises = convertListDateToJs(data);
			setExercises(convertedExercises);
		} catch (err) {
			setRequestError(err.message);
		}
		setIsLoading(false);
	}, []);

	const fetchExercisesLevels = useCallback(async () => {
		/* Clear any previous errors */
		setRequestError(null);
		setIsLoading(false);

		try {
			setIsLoading(true);

			const response = await fetch(`${URL}exercises_levels`);
			const data = await response.json();
			/* Extract the levels from JSON */
			const levels = data.map((currLevel) => currLevel.level);

			setExercisesLevels(levels);
		} catch (err) {
			setRequestError(err.message);
		}

		setIsLoading(false);
	}, []);

	/* Fetch data from server on page load */
	useEffect(() => {
		fetchExercises();
		fetchExercisesLevels();
	}, [fetchExercises, fetchExercisesLevels]);

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
				isLoading,
				requestError,
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
