import PropTypes from 'prop-types';
import React, { useState } from 'react';

const ExercisesContext = React.createContext({
	editId: null,
	exercises: [],
	options: [],
	// eslint-disable-next-line no-unused-vars
	onSelectOperation: (itemId, isDelete) => {},
	// eslint-disable-next-line no-unused-vars
	onAddExercise: (data) => {},
	onResetId: () => {},
});

export const ExercisesContextProvider = ({ children }) => {
	const LEVELS = ['Easy', 'Normal', 'Hard', 'Advanced'];
	const MOCK_EXERCISES = [
		{
			id: 1,
			name: 'Wild & Free',
			level: 'Easy',
			date: new Date(2021, 0, 1),
		},
		{
			id: 2,
			name: 'High Volume',
			level: 'Normal',
			date: new Date(2021, 3, 21),
		},
		{
			id: 3,
			name: 'Level Up Abs',
			level: 'Hard',
			date: new Date(2021, 5, 18),
		},
		{
			id: 4,
			name: 'Instant Dungeon',
			level: 'Normal',
			date: new Date(2021, 3, 10),
		},
		{
			id: 5,
			name: 'Speed +1',
			level: 'Normal',
			date: new Date(2021, 5, 8),
		},
		{
			id: 6,
			name: 'Warform',
			level: 'Hard',
			date: new Date(2021, 5, 7),
		},
		{
			id: 7,
			name: 'Power Boost ',
			level: 'Hard',
			date: new Date(2021, 3, 7),
		},
	];

	const [exercises, setExercises] = useState(MOCK_EXERCISES);

	// ID of Exercise to be edited,
	// if NULL, operation is not edit
	const [editId, setEditId] = useState();

	const updateExercises = (updated) =>
		exercises.map((e) => {
			let current = e;

			if (current.id === updated.id) {
				current = updated;
			}

			return current;
		});

	/**
	 * Set editId to null.
	 */
	const handleResetId = () => {
		setEditId(null);
	};

	const handleAddExercise = (data) => {
		// Edit operation
		if (editId) {
			// Reset editId
			handleResetId(null);
			return setExercises(updateExercises(data));
		}

		// Insert operation
		return setExercises((previousData) => [data, ...previousData]);
	};

	const deleteExercise = (id) => {
		setExercises((previousData) =>
			previousData.filter((exercise) => exercise.id !== id)
		);
	};

	const handleOperation = (itemId, isDelete) =>
		isDelete ? deleteExercise(itemId) : setEditId(itemId);

	return (
		<ExercisesContext.Provider
			value={{
				editId,
				exercises,
				options: LEVELS,
				onAddExercise: handleAddExercise,
				onSelectOperation: handleOperation,
				onResetId: handleResetId,
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
