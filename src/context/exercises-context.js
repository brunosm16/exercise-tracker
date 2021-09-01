import React from 'react';

const ExercisesContext = React.createContext({
	editId: null,
	exercises: [],
	levels: [],
	// eslint-disable-next-line no-unused-vars
	onAddExercise: (data) => {},
	// eslint-disable-next-line no-unused-vars
	onAddLevel: (data) => {},
	// eslint-disable-next-line no-unused-vars
	onUpdateExercise: (data) => {},
	// eslint-disable-next-line no-unused-vars
	onDeleteExercise: (id) => {},
	onSetId: () => {},
	isLoading: false,
	requestError: null,
});

export default ExercisesContext;
