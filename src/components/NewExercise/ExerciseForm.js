import { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ExerciseForm.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Select from '../UI/Select/Select';

// Formats a date from HTML input to a JavaScript Date.
const dateToJs = (inputDate) => {
	const dateSplit = inputDate.split('-');
	return new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
};

const validateName = (name) => name.trim().length >= 4;

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

	// Use editLevel & editDate default values as initialState.
	const [enteredLevel, setEnteredLevel] = useState(editLevel);
	const [enteredDate, setEnteredDate] = useState(editDate);
	const [formIsValid, setFormIsValid] = useState(true);

	useEffect(() => {
		dispatchName({ type: 'INPUT_USER', val: editName || nameState.value });
	}, [editName]);

	useEffect(() => {
		setEnteredLevel(editLevel || enteredLevel);
	}, [editLevel]);

	useEffect(() => {
		setEnteredDate(editDate || enteredDate);
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

	// Reset states used in Form
	const resetForm = () => {
		dispatchName({ type: 'INPUT_USER', value: '' });
		setEnteredLevel(editLevel);
		setEnteredDate(editDate);
	};

	const saveInput = () => {
		const inputObj = {
			id: editId || Math.random(),
			name: nameState.value,
			level: enteredLevel,
			date: dateToJs(enteredDate),
		};

		onSaveExercise(inputObj);
		resetForm();
	};

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

		return formIsValid ? saveInput() : '';
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
	editLevel: 'Easy',
	editDate: '2021-01-01',
};

ExerciseForm.propTypes = {
	onSaveExercise: PropTypes.func,
	onStopEdit: PropTypes.func,
	levels: PropTypes.arrayOf(PropTypes.string),
	editId: PropTypes.number,
	editName: PropTypes.string,
	editLevel: PropTypes.string,
	editDate: PropTypes.string,
};

export default ExerciseForm;
