import React from 'react';

const ExercisesContext = React.createContext({
	editId: null,
	exercises: [],
    options: [],
});

export default ExercisesContext;
