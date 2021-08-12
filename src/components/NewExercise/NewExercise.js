import PropTypes from 'prop-types';
import { useState } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import ExerciseForm from './ExerciseForm';
import styles from './NewExercise.module.css';

const NewExercise = ({
	onAddExercise,
	levels,
	editId,
	editName,
	editLevel,
	editDate,
}) => {
	const [isEdit, setIsEdit] = useState(false);

	// Converts a JavaScript Date to a date acceptable
	// on HTML input value.
	const toHTMLDate = (jsDate) => {
		const day =
			jsDate.getDate() < 10 ? `0${jsDate.getDate()}` : `${jsDate.getDate()}`;

		// JavaScript Date month starts as 0 (January)
		let month = jsDate.getMonth() + 1;
		month = month < 10 ? `0${month}` : `${month}`;

		const year = jsDate.getFullYear();

		return `${year}-${month}-${day}`;
	};

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
					editDate={editDate && toHTMLDate(editDate)}
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
	editId: undefined,
	editName: undefined,
	editLevel: undefined,
	editDate: undefined,
};

NewExercise.propTypes = {
	onAddExercise: PropTypes.func,
	levels: PropTypes.arrayOf(PropTypes.string),
	editId: PropTypes.number,
	editName: PropTypes.string,
	editLevel: PropTypes.string,
	editDate: PropTypes.objectOf(PropTypes.object),
};

export default NewExercise;
