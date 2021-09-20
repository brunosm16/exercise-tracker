import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import UseHttp from '../hooks/use-http';
import { ENDPOINT } from '../utils/HttpUtils';
import { convertListDateToJs, updateItemList } from '../utils/Utils';
import ExercisesContext from './exercises-context';

const ExercisesContextProvider = ({ children }) => {
	const [exercises, setExercises] = useState([]);
	const [levels, setLevels] = useState([]);
	const [modalError, setModalError] = useState(null);

	// ID of Exercise to be edited,
	// if NULL, operation is not edit
	const [editId, setEditId] = useState();

	const transformExercises = (data) => {
		/* Before set exercises State, convert each data to JS */
		const convertedExercises = convertListDateToJs(data);
		setExercises(convertedExercises);
	};

	const { isLoading, requestError, sendRequest: fetchExercises } = UseHttp();

	/* Fetch data from server on page load */
	useEffect(() => {
		fetchExercises(
			{
				url: `${ENDPOINT}/exercises`,
				headers: {
					'Content-Types': 'application/json',
				},
			},
			transformExercises
		);
	}, [fetchExercises]);

	const handleSetId = (id) => {
		setEditId(id);
	};

	const handleDeleteExercise = (id) => {
		setExercises((previousData) =>
			previousData.filter((exercise) => exercise.id !== id)
		);
	};

	const handleUpdateExercise = (exercise) => {
		handleSetId(null);
		setExercises((previousData) => updateItemList(previousData, exercise));
	};

	const handleAddLevel = (data) => {
		setLevels((previousData) => [...previousData, data]);
	};

	const handleAddExercise = (exercise) => {
		setExercises((previousData) => [exercise, ...previousData]);
	};

	const handleOpenCloseModal = (modalObj) => {
		setModalError(modalObj);
	};

	return (
		<ExercisesContext.Provider
			value={{
				editId,
				exercises,
				levels,
				onAddExercise: handleAddExercise,
				onUpdateExercise: handleUpdateExercise,
				onDeleteExercise: handleDeleteExercise,
				onAddLevel: handleAddLevel,
				onOpenCloseModal: handleOpenCloseModal,
				onSetId: handleSetId,
				modalError,
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
