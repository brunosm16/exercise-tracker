import { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ExerciseForm.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Select from '../UI/Select/Select';
import ExercisesContext from '../../context/exercises-context';
import {
	dateToHTML,
	dateToJs,
	initDate,
	initLevel,
	findItemById,
	convertListDateToJs,
	validateName,
} from '../../utils/Utils';

import { ENDPOINT, modalRequestError } from '../../utils/HttpUtils';
import UseHttp from '../../hooks/use-http';
import UseInput from '../../hooks/use-input';

const ExerciseForm = ({ onStopEdit }) => {
	const {
		value: nameValue,
		inputIsValid: nameIsValid,
		inputHasError: nameHasError,
		inputChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		inputResetHandler: nameResetHandler,
	} = UseInput(validateName);

	const formIsValid = nameIsValid;

	const [enteredLevel, setEnteredLevel] = useState(initLevel);
	const [enteredDate, setEnteredDate] = useState(initDate);

	const nameRef = useRef();

	const exerciseCtx = useContext(ExercisesContext);

	const { editId, exercises, levels } = exerciseCtx;

	const editExercise = findItemById(editId, exercises);

	const updateExercise = (data) => {
		const convertedData = convertListDateToJs([data]);
		exerciseCtx.onUpdateExercise(...convertedData);
	};

	const insertExercise = (data) => {
		const convertedData = convertListDateToJs([data]);
		exerciseCtx.onAddExercise(...convertedData);
	};

	const openCloseModal = () => {
		exerciseCtx.onOpenCloseModal(modalRequestError);
	};

	const { sendRequest: putExercise } = UseHttp();
	const { sendRequest: postExercise } = UseHttp();

	/**
	 * On edit operation, a new value for editExercise is set,
	 * and useEffect updates input states with editExercise properties.
	 */
	useEffect(
		() => editExercise && nameChangeHandler(editExercise.name)[editExercise]
	);

	useEffect(
		() => editExercise && setEnteredLevel(editExercise.level),
		[editExercise]
	);

	useEffect(
		() => editExercise && setEnteredDate(dateToHTML(editExercise.date)),
		[editExercise]
	);

	const focusOnName = () => nameRef.current.focus();

	/**  Reset states used in Form */
	const resetForm = () => {
		nameResetHandler();
		focusOnName();
		setEnteredLevel(initLevel);
		setEnteredDate(initDate);
	};

	const saveInput = () => {
		const obj = {
			name: nameValue,
			level: enteredLevel,
			date: dateToJs(enteredDate),
		};

		if (editId) {
			putExercise(
				{
					url: `${ENDPOINT}/exercises/${editId}`,
					method: 'PUT',
					body: obj,
					headers: {
						'Content-Type': 'application/json',
					},
				},
				updateExercise,
				openCloseModal
			);
			// reset editId
			exerciseCtx.onSetId(null);
		} else {
			postExercise(
				{
					url: `${ENDPOINT}/exercises`,
					method: 'POST',
					body: obj,
					headers: {
						'Content-Type': 'application/json',
					},
				},
				insertExercise,
				openCloseModal
			);
		}

		resetForm();
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

		/* Avoid empty values on page load */
		nameBlurHandler();

		return formIsValid ? saveInput() : focusOnName();
	};

	return (
		<>
			<form className={styles.form} onSubmit={submitHandler}>
				<div className={styles.controls}>
					<div className={styles.control}>
						<Input
							id="name"
							type="text"
							label="name"
							isInvalid={nameHasError}
							onChange={nameChangeHandler}
							onBlur={nameBlurHandler}
							value={nameValue}
							ref={nameRef}
							cssClass={styles['control-input']}
						/>
						{nameHasError && (
							<p className={styles['error-msg']}>Name must not be empty</p>
						)}
					</div>

					<div className={styles.control}>
						<Select
							id="level"
							label="level"
							levels={levels}
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
							isInvalid={false}
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
		</>
	);
};

ExerciseForm.defaultProps = {
	onStopEdit: () => {},
};

ExerciseForm.propTypes = {
	onStopEdit: PropTypes.func,
};

export default ExerciseForm;
