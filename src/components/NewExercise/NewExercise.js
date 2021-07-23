import PropTypes from 'prop-types';
import { useState } from 'react';
import ExerciseForm from './ExerciseForm';
import './NewExercise.css';

const NewExercise = ({ onAddExercise }) => {
	const [isAdd, setIsAdd] = useState(false);
	// save inserted data on ExerciseForm
	const saveExerciseDataHandler = (exercise) => {
		onAddExercise(exercise);
	};

	const handleCancel = () => {
		setIsAdd(false);
	};

	const handleClickAddExercise = () => {
		setIsAdd(true);
	};

	return (
		<div className="new-exercise">
			{isAdd && (
				<ExerciseForm
					onCancelAddExercise={handleCancel}
					onSaveDataExerciseData={saveExerciseDataHandler}
				/>
			)}

			{!isAdd && (
				<button type="button" onClick={handleClickAddExercise}>
					Add Exercise
				</button>
			)}
		</div>
	);
};

NewExercise.defaultProps = {
	onAddExercise: () => {},
};

NewExercise.propTypes = {
	onAddExercise: PropTypes.func,
};

export default NewExercise;
