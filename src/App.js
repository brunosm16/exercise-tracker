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

	const handleAddExercise = (data) => {
		setExercises((previousData) => [data, ...previousData]);
	};

	return (
		<div className="App">
			<NewExercise onAddExercise={handleAddExercise} levelOptions={levels} />
			<Exercises items={exercises} />
		</div>
	);
};

export default App;
