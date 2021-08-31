import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import UseHttp from '../hooks/use-http';
import { removeListItem, updateListItem } from '../utils/Utils';
import ExercisesContext from './exercises-context';

const ExercisesContextProvider = ({ children }) => {
	const [exercises, setExercises] = useState([]);
	const [levels, setLevels] = useState([]);

	// ID of Exercise to be edited,
	// if NULL, operation is not edit
	const [editId, setEditId] = useState();

	const transformLevels = (data) => {
		/* Extract the levels from JSON */
		const convertedLevels = data.map((currLevel) => currLevel.level);

		setLevels(convertedLevels);
	};

	const {
		isLoading,
		requestError,
		sendRequest: fetchLevels,
	} = UseHttp(
		{
			url: `http://localhost:3000/exercises_levels`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		},
		transformLevels
	);

	/* Fetch data from server on page load */
	useEffect(() => {
		fetchLevels();
	}, [fetchLevels]);

	/**
	 * Set editId to null.
	 */
	const handleResetEditId = () => {
		setEditId(null);
	};

	const handleUpdateExercise = (item) => {
		setExercises((previousData) => updateListItem(previousData, item));
	};

	const handleAddExercise = (item) => {
		setExercises((previousData) => [...previousData, item]);
	};

	const handleDeleteExercise = (item) => {
		setExercises((previousData) => removeListItem(previousData, item));
	};

	// async function handleAddExercise(exercise) {
	// 	let req;

	// 	if (editId) {
	// 		req = getRequestObj(
	// 			`${URL}/exercises/${editId}`,
	// 			'PUT',
	// 			exercise,
	// 			'application/json'
	// 		);
	// 	} else {
	// 		req = getRequestObj(
	// 			`${URL}/exercises`,
	// 			'POST',
	// 			exercise,
	// 			'application/json'
	// 		);
	// 	}

	// 	const { requestError: insertError, sendRequest: insertExercise } =
	// 		UseHttp(req);
	// 	// temporary
	// 	console.log(insertError);

	// 	insertExercise();

	// 	// Reload editId
	// 	setEditId(null);
	// }

	// async function deleteExercise(id) {
	// 	const response = await fetch(
	// 		`${URL}/exercises/${id}`,
	// 		getRequestObj('DELETE', {}, 'application/json')
	// 	);

	// 	const data = response.json();

	// 	return data;
	// }

	// const handleOperation = (itemId, isDelete) =>
	// 	isDelete ? deleteExercise(itemId) : setEditId(itemId);

	return (
		<ExercisesContext.Provider
			value={{
				editId,
				exercises,
				levels,
				onAddExercise: handleAddExercise,
				onUpdateExercise: handleUpdateExercise,
				onDeleteExercise: handleDeleteExercise,
				onResetEditId: handleResetEditId,
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
