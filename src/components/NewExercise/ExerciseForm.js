import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ExerciseForm.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Select from '../UI/Select/Select';
import ExercisesContext from '../../context/exercises-context';
import nameReducer from '../../context/reducers/reducers';
import {
	dateToHTML,
	dateToJs,
	initDate,
	initLevel,
	findItemById,
	stateIsNull,
} from '../../utils/Utils';

const ExerciseForm = ({ onStopEdit }) => {
	const [nameState, dispatchName] = useReducer(nameReducer, {
		value: '',
		isValid: null,
	});
	const [enteredLevel, setEnteredLevel] = useState(initLevel);
	const [enteredDate, setEnteredDate] = useState(initDate);
	const [formIsValid, setFormIsValid] = useState(true);

	/**
	 * Null is the initial value of name, on first page load,
	 * input is valid because user didn't enter any input.
	 */
	const nameIsNull = stateIsNull(nameState);
	const nameRef = useRef();

	const exerciseCtx = useContext(ExercisesContext);
	const [editId, exercises, options] = [
		exerciseCtx.editId,
		exerciseCtx.exercises,
		exerciseCtx.options,
	];
	const editExercise = findItemById(editId, exercises);

	/**
	 * On edit operation, a new value for editExercise is set,
	 * and useEffect updates input states with editExercise properties.
	 */
	useEffect(
		() =>
			editExercise &&
			dispatchName({
				type: 'INPUT_USER',
				val: editExercise.name,
			}),
		[editExercise]
	);

	useEffect(
		() => editExercise && setEnteredLevel(editExercise.level),
		[editExercise]
	);

	useEffect(
		() => editExercise && setEnteredDate(dateToHTML(editExercise.date)),
		[editExercise]
	);

	/** Validate form when input change. */
	useEffect(() => {
		const debounceId = setTimeout(() => {
			setFormIsValid(nameState.isValid);
		}, 500);

		return () => {
			clearTimeout(debounceId);
		};
	}, [nameState]);

	const focusOnName = () => nameRef.current.focus();

	/**  Reset states used in Form */
	const resetForm = () => {
		dispatchName({});
		focusOnName();
		setEnteredLevel(initLevel);
		setEnteredDate(initDate);
	};

	const saveInput = () => {
		exerciseCtx.onAddExercise({
			name: nameState.value,
			level: enteredLevel,
			date: dateToJs(enteredDate),
		});

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

		/** On first page load set isValid to false,
		 * if user tries to input a empty value
		 */
		dispatchName({ type: 'INPUT_BLUR' });

		return formIsValid ? saveInput() : focusOnName();
	};

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<div className={styles.controls}>
				<div className={styles.control}>
					<Input
						id="name"
						type="text"
						label="name"
						isValid={nameIsNull}
						onChange={nameChangeHandler}
						onBlur={nameValidateHandler}
						value={nameState.value}
						ref={nameRef}
						cssClass={styles['control-input']}
					/>
				</div>

				<div className={styles.control}>
					<Select
						id="level"
						label="level"
						options={options}
						onChange={levelChangeHandler}
						selected={enteredLevel}
						cssClass={styles['control-select']}
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
						cssClass={styles['control-input']}
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
