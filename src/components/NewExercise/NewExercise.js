import { useContext, useState } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import ExerciseForm from './ExerciseForm';
import styles from './NewExercise.module.css';
import ExercisesContext from '../../context/exercises-context';

const NewExercise = () => {
	const [isEdit, setIsEdit] = useState(false);

	const exerciseCtx = useContext(ExercisesContext);

	const handleCloseEdit = () => {
		setIsEdit(false);
	};

	const handleOpenEdit = () => {
		setIsEdit(true);
	};

	return (
		<Card cssClass={styles['new-exercise']}>
			{(isEdit || exerciseCtx.editId) && (
				<ExerciseForm onStopEdit={handleCloseEdit} />
			)}

			{!isEdit && !exerciseCtx.editId && (
				<Button isSubmit={false} onClick={handleOpenEdit}>
					Add Exercise
				</Button>
			)}
		</Card>
	);
};

export default NewExercise;
