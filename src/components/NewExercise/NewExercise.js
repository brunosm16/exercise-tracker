import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import ExerciseForm from './ExerciseForm';
import styles from './NewExercise.module.css';
import ExercisesContext from '../../context/exercises-context';

const NewExercise = ({ onAddExercise }) => {
	const [isEdit, setIsEdit] = useState(false);

	const exerciseCtx = useContext(ExercisesContext);

	const handleSaveExercise = (exercise) => {
		onAddExercise(exercise);
	};

	const handleCloseEdit = () => {
		setIsEdit(false);
	};

	const handleOpenEdit = () => {
		setIsEdit(true);
	};

	return (
		<Card cssClass={styles['new-exercise']}>
			{(isEdit || exerciseCtx.editId) && (
				<ExerciseForm
					onStopEdit={handleCloseEdit}
					onSaveExercise={handleSaveExercise}
				/>
			)}

			{!isEdit && !exerciseCtx.editId && (
				<Button isSubmit={false} onClick={handleOpenEdit}>
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
