import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ExerciseForm.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Select from '../UI/Select/Select';

const ExerciseForm = ({ onSaveExercise, onStopEditing, levels }) => {
	const defaultDate = '2021-01-01';
	const defaultLevel = 'Easy';

	// entered states
	const [enteredName, setEnteredName] = useState('');
	const [enteredLevel, setEnteredLevel] = useState('Easy');
	const [enteredDate, setEnteredDate] = useState('');

	// validation states
	const [nameValid, setNameValid] = useState(true);

	const isEmptyStr = (str) => str.trim().length === 0;

	const formatDate = (strDate) => {
		const dateSplit = strDate.split('-');
		const year = dateSplit[0];
		const month = dateSplit[1] - 1;
		const day = dateSplit[2];

		return new Date(year, month, day);
	};

	const getCurrentDate = () => enteredDate || defaultDate;

	const getCurrentLevel = () => enteredLevel || defaultLevel;

	const nameChangeHandler = (event) => {
		setEnteredName(event.target.value);
	};

	const levelChangeHandler = (event) => {
		setEnteredLevel(event.target.value);
	};

	const dateChangeHandler = (event) => {
		setEnteredDate(event.target.value);
	};

	const formValid = () => {
		const isNameValid = !isEmptyStr(enteredName);

		// update states
		setNameValid(isNameValid);

		return isNameValid;
	};

	const submitHandler = (event) => {
		event.preventDefault();

		if (formValid()) {
			// assign data to be saved
			const exerciseData = {
				id: Math.random(),
				name: enteredName,
				level: getCurrentLevel(),
				date: formatDate(getCurrentDate()),
			};

			onSaveExercise(exerciseData);

			// reset form values
			setEnteredName('');
			setEnteredLevel('');
			setEnteredDate('');
		}
	};

	const cancelHandler = () => {
		onStopEditing();
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
};

ExerciseForm.propTypes = {
	onSaveExercise: PropTypes.func,
	onStopEditing: PropTypes.func,
	levels: PropTypes.arrayOf(PropTypes.string),
};

export default ExerciseForm;
