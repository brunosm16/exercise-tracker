import React from 'react';

const ExercisesContext = React.createContext({
	editId: null,
	exercises: [],
	levels: [],
	// eslint-disable-next-line no-unused-vars
	onSelectOperation: (itemId, isDelete) => {},
	// eslint-disable-next-line no-unused-vars
	onAddExercise: (data) => {},
	// eslint-disable-next-line no-unused-vars
	onAddLevel: (data) => {},
	onResetId: () => {},
	isLoading: false,
	requestError: null,
});

export default ExercisesContext;
