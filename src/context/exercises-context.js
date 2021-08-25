import React from 'react';

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

export default ExercisesContext;
