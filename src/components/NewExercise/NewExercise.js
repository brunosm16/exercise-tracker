import PropTypes from 'prop-types';
import { useState } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import ExerciseForm from './ExerciseForm';
import styles from './NewExercise.module.css';

const NewExercise = ({ onAddExercise, levels, editExercise }) => {
	const [isEdit, setIsEdit] = useState(false);

	const [editId, editName, editLevel, editDate] = [
		editExercise.id,
		editExercise.name,
		editExercise.level,
		editExercise.date,
	];

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
			{(isEdit || editId) && (
				<ExerciseForm
					onStopEdit={handleCloseEdit}
					onSaveExercise={handleSaveExercise}
					levels={levels}
					editId={editId}
					editName={editName}
					editLevel={editLevel}
					editDate={editDate}
				/>
			)}

			{!isEdit && !editId && (
				<Button isSubmit={false} onClick={handleOpenEdit}>
					Add Exercise
				</Button>
			)}
		</Card>
	);
};

NewExercise.defaultProps = {
	onAddExercise: () => {},
	levels: [],
	editExercise: {
		editId: undefined,
		editName: undefined,
		editLevel: undefined,
		editDate: undefined,
	},
};

NewExercise.propTypes = {
	onAddExercise: PropTypes.func,
	levels: PropTypes.arrayOf(PropTypes.string),
	editExercise: PropTypes.objectOf(PropTypes.object),
};

export default NewExercise;
