import { useState } from 'react';
import PropTypes from 'prop-types';
import ExercisesFilter from './ExercisesFilter';
import Card from '../UI/Card';
import './Exercises.css';

const Exercises = ({ items }) => {
	const [filteredLevel, setFilteredLevel] = useState('Easy');

	const filteredByLevel = items.filter(
		(exercise) => exercise.level === filteredLevel
	);

	const handleSelectedFilter = (filter) => {
		setFilteredLevel(filter);
		console.log(filteredByLevel);
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

Exercises.defaultProps = {
	items: [],
};

Exercises.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
};

export default Exercises;
