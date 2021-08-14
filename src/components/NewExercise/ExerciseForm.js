import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ExerciseForm.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Select from '../UI/Select/Select';
import ExercisesContext from '../../context/exercises-context';

const initialDate = '2021-01-01';
const initialLevel = 'Easy';

// Formats a date from HTML input to a JavaScript Date.
const dateToJs = (inputDate) => {
	const dateSplit = inputDate.split('-');
	return new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
};

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

const validateName = (name) => name.trim().length >= 4;

const nameReducer = (state, action) => {
	if (action.type === 'INPUT_USER') {
		return { value: action.val, isValid: validateName(action.val || '') };
	}

	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: validateName(state.value) };
	}

	return { value: '', isValid: false };
};

const ExerciseForm = ({ onStopEdit }) => {
	// Used to fetch the Exercise to be edited
	const exerciseCtx = useContext(ExercisesContext);
	const [editId, exercises, options] = [
		exerciseCtx.editId,
		exerciseCtx.exercises,
		exerciseCtx.options,
	];

	const editExercise = () => {
		if (exercises) {
			return exerciseCtx.exercises.filter(
				(exercise) => exercise.id === editId
			)[0];
		}

		return undefined;
	};
	const editName = editExercise() ? editExercise().name : undefined;
	const editLevel = editExercise() ? editExercise().level : undefined;
	const editDate = editExercise() ? toHTMLDate(editExercise().date) : undefined;

	const [nameState, dispatchName] = useReducer(nameReducer, {
		value: '',
		isValid: null,
	});

	const nameRef = useRef();

	const [enteredLevel, setEnteredLevel] = useState(initialLevel);
	const [enteredDate, setEnteredDate] = useState(initialDate);
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
		setEnteredLevel(initialLevel);
		setEnteredDate(initialDate);
	};

	const saveInput = () => {
		const inputObj = {
			id: editId || Math.random(),
			name: nameState.value,
			level: enteredLevel,
			date: dateToJs(enteredDate),
		};

		exerciseCtx.onAddExercise(inputObj)
		
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

		return formIsValid ? saveInput() : nameRef.current.focus();
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
						ref={nameRef}
					/>
				</div>

				<div className={styles.control}>
					<Select
						id="level"
						label="level"
						options={options}
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
	onStopEdit: () => {},
};

ExerciseForm.propTypes = {
	onStopEdit: PropTypes.func,
};

export default ExerciseForm;
