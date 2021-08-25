import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { convertListDateToJs, getRequestObj } from '../utils/Utils';

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

const URL = 'http://localhost:3000';
const CONTENT_TYPE = 'application/json';
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

		try {
			setIsLoading(true);
			const response = await fetch(`${URL}/exercises`);

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

			const response = await fetch(`${URL}/exercises_levels`);
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

	/**
	 * Set editId to null.
	 */
	const handleResetId = () => {
		setEditId(null);
	};

	async function handleAddExercise(exercise) {
		let fetchURL;
		let req;

		// Edit operation
		if (editId) {
			fetchURL = `${URL}/exercises/${editId}`;
			req = getRequestObj('PUT', exercise, CONTENT_TYPE);
		} else {
			// Insert operation
			fetchURL = `${URL}/exercises`;
			req = getRequestObj('POST', exercise, CONTENT_TYPE);
		}

		const response = await fetch(fetchURL, req);
		const data = response.json();

		// Reload Exercises after insertion
		fetchExercises();

		// Reload editId
		setEditId(null);

		return data;
	}

	async function deleteExercise(id) {
		const response = await fetch(
			`${URL}/exercises/${id}`,
			getRequestObj('DELETE', {}, CONTENT_TYPE)
		);
		const data = response.json();

		// Reload Exercises after deletion
		fetchExercises();

		return data;
	}

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
