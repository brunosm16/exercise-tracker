import { useState } from 'react';
import ExercisesFilter from './ExercisesFilter';
import Card from '../UI/Card';
import './Exercises.css';

const Exercises = () => {
	const [filteredLevel, setFilteredLevel] = useState('Easy');

	const handleSelectedFilter = (filter) => {
		setFilteredLevel(filter);
	};

	return (
		<Card cssClass="exercises">
			<ExercisesFilter
				onSelectedFilter={handleSelectedFilter}
				select={filteredLevel}
			/>
		</Card>
	);
};

export default Exercises;
