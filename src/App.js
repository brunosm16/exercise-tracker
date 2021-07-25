import { useState } from 'react';
import './App.css';
import NewExercise from './components/NewExercise/NewExercise';
import Exercises from './components/Exercises/Exercises';

const INIT_EXERCISES = [
	{
		id: 1,
		name: 'Wild & Free',
		level: 'Easy',
	},
	{
		id: 2,
		name: 'High Volume',
		level: 'Normal',
	},
	{
		id: 3,
		name: 'Level Up Abs',
		level: 'Hard',
	},
	{
		id: 4,
		name: 'Instant Dungeon',
		level: 'Normal',
	},
	{
		id: 4,
		name: 'Speed +1',
		level: 'Normal',
	},
	{
		id: 5,
		name: 'Warform',
		level: 'Hard',
	},
	{
		id: 6,
		name: 'Power Boost ',
		level: 'Hard',
	},
];

const App = () => {
	const [exercises, setExercises] = useState(INIT_EXERCISES);

	const handleAddExercise = (data) => {
		setExercises((previousData) => [data, ...previousData]);
	};

	return (
		<div className="App">
			<NewExercise onAddExercise={handleAddExercise} />
			<Exercises items={exercises} />
		</div>
	);
};

export default App;
