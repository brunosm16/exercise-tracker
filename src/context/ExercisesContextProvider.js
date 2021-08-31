import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import UseHttp from '../hooks/use-http';
import { convertListDateToJs, getRequestObj } from '../utils/Utils';
import ExercisesContext from './exercises-context';

/**
 * Constants used
 */
const URL = 'http://localhost:3000';
const CONTENT_TYPE = 'application/json';

const ExercisesContextProvider = ({ children }) => {
	// todo -- fetchExercises with use-http.

	const [exercises, setExercises] = useState([]);
	const [levels, setLevels] = useState([]);

	// ID of Exercise to be edited,
	// if NULL, operation is not edit
	const [editId, setEditId] = useState();

	const transformExercises = (data) => {
		/* Before set exercises State, convert each data to JS */
		const convertedExercises = convertListDateToJs(data);
		setExercises(convertedExercises);
	};

	const {
		isLoading,
		requestError,
		sendRequest: fetchExercises,
	} = UseHttp(
		{
			url: `${URL}/exercises`,
			headers: {
				'Content-Types': 'application/json',
			},
		},
		transformExercises
	);

	/* Fetch data from server on page load */
	useEffect(() => {
		fetchExercises();
	}, [fetchExercises]);

	/**
	 * Set editId to null.
	 */
	const handleResetId = () => {
		setEditId(null);
	};

	const handleAddLevel = (data) => {
		setLevels((previousData) => [...previousData, data]);
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
				levels,
				onAddExercise: handleAddExercise,
				onAddLevel: handleAddLevel,
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

export default ExercisesContextProvider;
