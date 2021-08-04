import PropTypes from 'prop-types';
import { useState } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import ExerciseForm from './ExerciseForm'; 
import styles from './NewExercise.module.css';

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
		<Card cssClass={styles['new-exercise']}>
			{isAdd && (
				<ExerciseForm
					onCancelAddExercise={handleCancel}
					onSaveDataExerciseData={saveExerciseDataHandler}
				/>
			)}

			{!isAdd && (
				<Button isSubmit={false} onClick={handleClickAddExercise}>
					Add Exercise
				</Button>
			)}
		</Card>
	);
};

NewExercise.defaultProps = {
	onAddExercise: () => {},
};

NewExercise.propTypes = {
	onAddExercise: PropTypes.func,
};

export default NewExercise;
