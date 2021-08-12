import { useState } from 'react';
import './App.css';
import NewExercise from './components/NewExercise/NewExercise';
import Exercises from './components/Exercises/Exercises';

const levels = ['Easy', 'Normal', 'Hard', 'Advanced'];

const App = () => {
	const [exercises, setExercises] = useState([]);
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
			<Exercises onSelectedOperation={handleOperation} items={exercises} levels={levels}/>
		</div>
	);
};

export default App;
