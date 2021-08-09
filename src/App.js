import { useState } from 'react';
import './App.css';
import NewExercise from './components/NewExercise/NewExercise';
import Exercises from './components/Exercises/Exercises';

const INIT_EXERCISES = [
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

const levels = ['Easy', 'Normal', 'Hard', 'Advanced'];

const App = () => {
	const [exercises, setExercises] = useState(INIT_EXERCISES);
	const [editId, setEditId] = useState();

	const updateExercises = (newExercise) =>
		exercises.map((exercise) => {
			let tempExercise = exercise;

			if (tempExercise.id === newExercise.id) {
				tempExercise = newExercise;
			}

			return tempExercise;
		});

	const getExerciseById = (id) =>
		exercises.filter((exercise) => exercise.id === id)[0];

	const getEditUser = () => (editId ? getExerciseById(editId) : undefined);

	const handleAddExercise = (data) => {
		// edit operation
		if (editId) {
			// reset editId value
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

	const editOperation = (id) => {
		setEditId(id);
	};

	const handleOperation = (itemId, isDelete) =>
		isDelete ? deleteExercise(itemId) : editOperation(itemId);

	return (
		<div className="App">
			<NewExercise
				onAddExercise={handleAddExercise}
				levelOptions={levels}
				editExercise={getEditUser()}
			/>
			<Exercises onSelectedOperation={handleOperation} items={exercises} />
		</div>
	);
};

export default App;
