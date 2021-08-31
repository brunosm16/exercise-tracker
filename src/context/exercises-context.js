import React from 'react';

const ExercisesContext = React.createContext({
	editId: null,
	exercises: [],
	levels: [],
	// eslint-disable-next-line no-unused-vars
	onAddExercise: (data) => {},
	onResetEditId: () => {},
	isLoading: false,
	requestError: null,
});

export default ExercisesContext;
