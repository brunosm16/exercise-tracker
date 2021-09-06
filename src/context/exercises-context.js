/* eslint-disable no-unused-vars */
import React from 'react';

const ExercisesContext = React.createContext({
	editId: null,
	exercises: [],
	levels: [],
	onAddExercise: (data) => {},
	onAddLevel: (data) => {},
	onUpdateExercise: (data) => {},
	onDeleteExercise: (id) => {},
	onOpenCloseModal: (errorObj) => {},
	onSetId: (id) => {},
	isLoading: false,
	requestError: null,
});

export default ExercisesContext;
