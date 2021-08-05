import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ExerciseForm.module.css';
import Button from '../UI/Button/Button';
import FormControl from '../UI/Form/FormControl';
import Input from '../UI/Input/Input';
import Label from '../UI/Label/Label';

const ExerciseForm = ({ onSaveDataExerciseData, onCancelAddExercise }) => {
	const [enteredName, setEnteredName] = useState('');
	const [enteredLevel, setEnteredLevel] = useState('');
	const [enteredDate, setEnteredDate] = useState('2021-01-01');
	const [levelInvalid, setLevelInvalid] = useState(false);
	const [nameInvalid, setNameInvalid] = useState(false);

	const levelIsInvalid = (level) =>
		level.trim().length === 0 ||
		!(
			level.toUpperCase() === 'EASY' ||
			level.toUpperCase() === 'NORMAL' ||
			level.toUpperCase() === 'HARD' ||
			level.toUpperCase() === 'ADVANCED'
		);

	const nameIsInvalid = (name) => name.trim().length === 0;

	const formatDate = (strDate) => {
		const dateSplit = strDate.split('-');
		const year = dateSplit[0];
		const month = dateSplit[1] - 1;
		const day = dateSplit[2];

		return new Date(year, month, day);
	};

	const nameChangeHandler = (event) => {
		setEnteredName(event.target.value);
	};

	const levelChangeHandler = (event) => {
		setEnteredLevel(event.target.value);
	};

	const dateChangeHandler = (event) => {
		setEnteredDate(event.target.value);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		const inputNameInvalid = nameIsInvalid(enteredName);
		const inputLevelInvalid = levelIsInvalid(enteredLevel);

		if (inputNameInvalid) {
			setNameInvalid(true);
		} else {
			setNameInvalid(false);
		}

		if (inputLevelInvalid) {
			setLevelInvalid(true);
		} else {
			setLevelInvalid(false);
		}

		if (!inputNameInvalid && !inputLevelInvalid) {
			// assign data to be saved
			const exerciseData = {
				id: Math.random(),
				name: enteredName,
				level: enteredLevel,
				date: formatDate(enteredDate || '2021-01-01'),
			};

			// pass input data to be saved
			onSaveDataExerciseData(exerciseData);

			// reset form values
			setEnteredName('');
			setEnteredLevel('');
			setEnteredDate('');
		}
	};

	const cancelHandler = () => {
		onCancelAddExercise();
	};

	return (
		<form className={styles['exercise-form']} onSubmit={submitHandler}>
			<div className={styles['exercise-form__controls']}>
				<FormControl isInvalid={nameInvalid}>
					<Label htmlFor="name">
						<p>Name:</p>
					</Label>
					<Input
						id="name"
						type="text"
						onChange={nameChangeHandler}
						value={enteredName}
					/>
				</FormControl>

				<FormControl isInvalid={levelInvalid}>
					<Label htmlFor="level">
						<p>Level:</p>
					</Label>
					<Input
						id="level"
						type="text"
						value={enteredLevel}
						onChange={levelChangeHandler}
					/>
				</FormControl>

				<FormControl>
					<Label htmlFor="date">
						<p>Date:</p>
					</Label>
					<Input
						type="date"
						value={enteredDate || '2021-01-01'}
						min="2021-01-01"
						max="2025-12-12"
						onChange={dateChangeHandler}
					/>
				</FormControl>
			</div>

			<div className={styles['exercise-form__actions']}>
				<div className={styles['exercise-form__action']}>
					<Button isSubmit={false} onClick={cancelHandler}>
						Cancel
					</Button>
				</div>
				<div className={styles['exercise-form__action']}>
					<Button isSubmit>Add Exercise</Button>
				</div>
			</div>
		</form>
	);
};

ExerciseForm.defaultProps = {
	onSaveDataExerciseData: () => {},
	onCancelAddExercise: () => {},
};

ExerciseForm.propTypes = {
	onSaveDataExerciseData: PropTypes.func,
	onCancelAddExercise: PropTypes.func,
};

export default ExerciseForm;
