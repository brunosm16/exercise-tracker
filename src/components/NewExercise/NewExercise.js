import PropTypes from 'prop-types';
import { useState } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import ExerciseForm from './ExerciseForm';
import styles from './NewExercise.module.css';

const NewExercise = ({ onAddExercise }) => {
	const [isEdit, setIsEdit] = useState(false);

	// save inserted data on ExerciseForm
	const handleSaveExercise = (exercise) => {
		onAddExercise(exercise);
	};

	const handleCancel = () => {
		setIsEdit(false);
	};

	const handleIsEdit = () => {
		setIsEdit(true);
	};

	return (
		<Card cssClass={styles['new-exercise']}>
			{isEdit && (
				<ExerciseForm
					onStopEditing={handleCancel}
					onSaveExercise={handleSaveExercise}
				/>
			)}

			{!isEdit && (
				<Button isSubmit={false} onClick={handleIsEdit}>
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
