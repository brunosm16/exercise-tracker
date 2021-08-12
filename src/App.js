import { useState } from 'react';
import './App.css';
import NewExercise from './components/NewExercise/NewExercise';
import Exercises from './components/Exercises/Exercises';

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

	// id of exercise to be edited. if null isn't edit operation
	const [editId, setEditId] = useState();

	const updateExercises = (updated) =>
		exercises.map((e) => {
			let current = e;

			if (current.id === updated.id) {
				current = updated;
			}

			return current;
		});

	const getExerciseById = (id) =>
		exercises.filter((exercise) => exercise.id === id)[0];

	const getEditExercise = () => (editId ? getExerciseById(editId) : undefined);

	const handleAddExercise = (data) => {
		// edit operation
		if (editId) {
			// reset editId
			setEditId(null);
			return setExercises(updateExercises(data));
		}

		// add operation
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
		<div className="App">
			<NewExercise
				onAddExercise={handleAddExercise}
				levels={LEVELS}
				editExercise={getEditExercise()}
			/>
			<Exercises
				onSelectOperation={handleOperation}
				items={exercises}
				levels={LEVELS}
			/>
		</div>
	);
};

export default App;
