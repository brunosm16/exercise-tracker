import { useState } from 'react';
import './App.css';
import NewExercise from './components/NewExercise/NewExercise';
import Exercises from './components/Exercises/Exercises';
import ExercisesContext from './context/exercises-context';

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

const App = () => {
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

	const handleAddExercise = (data) => {
		// Edit operation
		if (editId) {
			// Reset editId
			setEditId(null);
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
			}}
		>
			<div className="App">
				<NewExercise onAddExercise={handleAddExercise}/>
				<Exercises
					onSelectOperation={handleOperation}
					items={exercises}
				/>
			</div>
		</ExercisesContext.Provider>
	);
};

export default App;
