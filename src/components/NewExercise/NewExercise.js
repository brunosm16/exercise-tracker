import { useContext, useEffect, useState } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import ExerciseForm from './ExerciseForm';
import styles from './NewExercise.module.css';
import ExercisesContext from '../../context/exercises-context';

const NewExercise = () => {
	/* State for when user select Edit Operation */
	const [isEdit, setIsEdit] = useState(false);

	/* State to check if user is editing a Exercise */
	const [isEditing, setIsEditing] = useState();

	const exerciseCtx = useContext(ExercisesContext);
	const [editId, onSetId] = [exerciseCtx.editId, exerciseCtx.onSetId];

	useEffect(() => {
		setIsEditing(editId);
	}, [editId]);

	const handleCloseEdit = () => {
		/* Close form when Editing */
		onSetId(null);
		setIsEdit(false);
	};

	const handleOpenEdit = () => {
		setIsEdit(true);
	};

	return (
		<Card cssClass={styles['new-exercise']}>
			{(isEdit || isEditing) && <ExerciseForm onStopEdit={handleCloseEdit} />}

			{!isEdit && !isEditing && (
				<Button
					isSubmit={false}
					disabled={exerciseCtx.levels.length === 0}
					onClick={handleOpenEdit}
				>
					Add Exercise
				</Button>
			)}
		</Card>
	);
};

export default NewExercise;
