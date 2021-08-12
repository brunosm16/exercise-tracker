import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ExerciseForm.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Select from '../UI/Select/Select';

const ExerciseForm = ({
	onSaveExercise,
	onStopEditing,
	levels,
	exerciseId,
	exerciseName,
	exerciseLevel,
}) => {
	// constants
	const defaultDate = '2021-01-01';
	const defaultLevel = 'Easy';

	// entered states
	const [enteredName, setEnteredName] = useState('');
	const [enteredLevel, setEnteredLevel] = useState(defaultLevel);
	const [enteredDate, setEnteredDate] = useState(defaultDate);

	// validation states
	const [nameValid, setNameValid] = useState(true);
	const [formIsValid, setFormIsValid] = useState(true);

	// edit operation values
	const currentName = exerciseName || enteredName;
	const currentLevel = exerciseLevel || enteredLevel;

	const validateName = (str) => str.trim().length >= 4;

	// set edit values to enteredStates
	useEffect(() => {
		setEnteredName(currentName);
	}, [currentName]);

	useEffect(() => {
		setEnteredLevel(currentLevel);
	}, [currentLevel]);

	// validate form when input change
	useEffect(() => {
		setFormIsValid(validateName(enteredName));
	}, [enteredName]);

	const resetStates = () => {
		// reset form values
		setEnteredName('');
		setEnteredLevel('');
		setEnteredDate('');
	};

	const formatDate = (strDate) => {
		const dateSplit = strDate.split('-');
		const year = dateSplit[0];
		const month = dateSplit[1] - 1;
		const day = dateSplit[2];

		return new Date(year, month, day);
	};

	const getCurrentDate = () => enteredDate || defaultDate;

	const getCurrentLevel = () => enteredLevel || defaultLevel;

	const saveData = () => {
		// assign data to be saved
		const exerciseData = {
			id: exerciseId || Math.random(),
			name: enteredName,
			level: getCurrentLevel(),
			date: formatDate(getCurrentDate()),
		};

		onSaveExercise(exerciseData);
		resetStates();
	};

	const nameChangeHandler = (event) => {
		setEnteredName(event.target.value);
	};

	const nameValidateHandler = (event) => {
		setNameValid(validateName(event.target.value));
	};

	const levelChangeHandler = (event) => {
		setEnteredLevel(event.target.value);
	};

	const dateChangeHandler = (event) => {
		setEnteredDate(event.target.value);
	};

	const cancelHandler = () => {
		onStopEditing();
	};

	const submitHandler = (event) => {
		event.preventDefault();

		if (formIsValid) {
			saveData();
		}
	};

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<div className={styles.controls}>
				<div className={styles.control}>
					<Input
						id="name"
						type="text"
						label="name"
						isValid={nameValid}
						onChange={nameChangeHandler}
						onBlur={nameValidateHandler}
						value={enteredName}
					/>
				</div>

				<div className={styles.control}>
					<Select
						id="level"
						label="level"
						options={levels}
						onChange={levelChangeHandler}
						selected={enteredLevel}
					/>
				</div>

				<div className={styles.control}>
					<Input
						type="date"
						label="date"
						value={getCurrentDate()}
						min="2021-01-01"
						max="2025-12-12"
						onChange={dateChangeHandler}
					/>
				</div>
			</div>

			<div className={styles.actions}>
				<div className={styles.action}>
					<Button isSubmit={false} onClick={cancelHandler}>
						Cancel
					</Button>
				</div>
				<div className={styles.action}>
					<Button isSubmit>Add Exercise</Button>
				</div>
			</div>
		</form>
	);
};

ExerciseForm.defaultProps = {
	onSaveExercise: () => {},
	onStopEditing: () => {},
	levels: [],
	exerciseId: undefined,
	exerciseName: undefined,
	exerciseLevel: undefined,
};

ExerciseForm.propTypes = {
	onSaveExercise: PropTypes.func,
	onStopEditing: PropTypes.func,
	levels: PropTypes.arrayOf(PropTypes.string),
	exerciseId: PropTypes.number,
	exerciseName: PropTypes.string,
	exerciseLevel: PropTypes.string,
};

export default ExerciseForm;
