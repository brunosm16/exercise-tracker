import { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ExerciseForm.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Select from '../UI/Select/Select';

/*
 * constants
 */
const defaultDate = '2021-01-01';
const defaultLevel = 'Easy';
const validateName = (name) => name.trim().length >= 4;

// formats a HTML Input date to a JavaScript Date.
const formatDate = (inputDate) => {
	const dateSplit = inputDate.split('-');
	return new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
};

// formats a JavaScript Date in HTML date | yyyy-mm-dd
const dateToHtml = (date) => {
	const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
	const monthInt = parseInt(date.getMonth(), 10) + 1;
	const monthStr = monthInt < 10 ? `0${monthInt}` : `${monthInt}`;

	return `${date.getFullYear()}-${day}-${monthStr}`;
};

/*
 * reducers
 */

const nameReducer = (state, action) => {
	if (action.type === 'INPUT_USER') {
		return { value: action.val, isValid: validateName(action.val || '') };
	}

	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: validateName(state.value) };
	}

	return { value: '', isValid: true };
};

const ExerciseForm = ({
	onSaveExercise,
	onStopEdit,
	levels,
	editId,
	editName,
	editLevel,
	editDate,
}) => {
	const [nameState, dispatchName] = useReducer(nameReducer, {
		value: '',
		isValid: null,
	});

	const [enteredLevel, setEnteredLevel] = useState(defaultLevel);
	const [enteredDate, setEnteredDate] = useState(defaultDate);
	const [formIsValid, setFormIsValid] = useState(true);

	const resetInputStates = () => {
		// reset form values
		dispatchName({ type: 'INPUT_USER', value: '' });
		setEnteredLevel(defaultLevel);
		setEnteredDate(defaultDate);
	};

	const saveData = () => {
		const exerciseData = {
			id: editId || Math.random(),
			name: nameState.value,
			level: enteredLevel,
			date: formatDate(enteredDate),
		};

		onSaveExercise(exerciseData);
		resetInputStates();
	};

	useEffect(() => {
		dispatchName({ type: 'INPUT_USER', val: editName || nameState.value });
	}, [editName]);

	useEffect(() => {
		setEnteredLevel(editLevel || enteredLevel);
	}, [editLevel]);

	useEffect(() => {
		setEnteredDate(editDate ? dateToHtml(editDate) : enteredDate);
	}, [editDate]);

	// validate form when input change.
	useEffect(() => {
		const debounceId = setTimeout(() => {
			setFormIsValid(nameState.isValid);
		}, 500);

		return () => {
			clearTimeout(debounceId);
		};
	}, [nameState]);

	const nameChangeHandler = (event) => {
		dispatchName({ type: 'INPUT_USER', val: event.target.value });
	};

	const nameValidateHandler = () => {
		dispatchName({ type: 'INPUT_BLUR' });
	};

	const levelChangeHandler = (event) => {
		setEnteredLevel(event.target.value);
	};

	const dateChangeHandler = (event) => {
		setEnteredDate(event.target.value);
	};

	const cancelHandler = () => {
		onStopEdit();
	};

	const submitHandler = (event) => {
		event.preventDefault();

		return formIsValid ? saveData() : '';
	};

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<div className={styles.controls}>
				<div className={styles.control}>
					<Input
						id="name"
						type="text"
						label="name"
						isValid={nameState.isValid}
						onChange={nameChangeHandler}
						onBlur={nameValidateHandler}
						value={nameState.value}
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
						value={enteredDate}
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
	onStopEdit: () => {},
	levels: [],
	editId: undefined,
	editName: undefined,
	editLevel: undefined,
	editDate: undefined,
};

ExerciseForm.propTypes = {
	onSaveExercise: PropTypes.func,
	onStopEdit: PropTypes.func,
	levels: PropTypes.arrayOf(PropTypes.string),
	editId: PropTypes.number,
	editName: PropTypes.string,
	editLevel: PropTypes.string,
	editDate: PropTypes.objectOf(PropTypes.object),
};

export default ExerciseForm;
