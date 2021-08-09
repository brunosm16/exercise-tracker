import PropTypes from 'prop-types';
import { useState } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import ExerciseForm from './ExerciseForm';
import styles from './NewExercise.module.css';

const NewExercise = ({ onAddExercise, levelOptions, editExercise }) => {
	const [isEdit, setIsEdit] = useState(false);

	const editId = editExercise ? editExercise.id : undefined;
	const editName = editExercise ? editExercise.name : undefined;
	const editLevel = editExercise ? editExercise.level : undefined;

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
			{(isEdit || editId) && (
				<ExerciseForm
					onStopEditing={handleCancel}
					onSaveExercise={handleSaveExercise}
					levels={levelOptions}
					exerciseId={editId}
					exerciseName={editName}
					exerciseLevel={editLevel}
				/>
			)}

			{(!isEdit && !editId) && (
				<Button isSubmit={false} onClick={handleIsEdit}>
					Add Exercise
				</Button>
			)}
		</Card>
	);
};

NewExercise.defaultProps = {
	onAddExercise: () => {},
	levelOptions: [],
	editExercise: {},
};

NewExercise.propTypes = {
	onAddExercise: PropTypes.func,
	levelOptions: PropTypes.arrayOf(PropTypes.string),
	editExercise: PropTypes.objectOf(PropTypes.object),
};

export default NewExercise;
