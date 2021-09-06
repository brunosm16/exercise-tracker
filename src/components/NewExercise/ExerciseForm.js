import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ExerciseForm.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Select from '../UI/Select/Select';
import ExercisesContext from '../../context/exercises-context';
import nameReducer from '../../context/reducers/reducers';
import Modal from '../UI/Modal/Modal';
import {
	dateToHTML,
	dateToJs,
	initDate,
	initLevel,
	findItemById,
	stateIsNull,
	convertListDateToJs,
} from '../../utils/Utils';

import { ENDPOINT, modalRequestError } from '../../utils/HttpUtils';
import UseHttp from '../../hooks/use-http';

const ExerciseForm = ({ onStopEdit }) => {
	const [nameState, dispatchName] = useReducer(nameReducer, {
		value: '',
		isValid: null,
	});
	const [enteredLevel, setEnteredLevel] = useState(initLevel);
	const [enteredDate, setEnteredDate] = useState(initDate);
	const [formIsValid, setFormIsValid] = useState(true);
	const [modalIsOpen, setModalIsOpen] = useState(false);

	/**
	 * Null is the initial value of name, on first page load,
	 * input is valid because user didn't enter any input.
	 */
	const nameIsNull = stateIsNull(nameState);
	const nameRef = useRef();

	const exerciseCtx = useContext(ExercisesContext);
	const [editId, exercises, levels] = [
		exerciseCtx.editId,
		exerciseCtx.exercises,
		exerciseCtx.levels,
	];
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
	let modalMessage;

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
		const obj = {
			name: nameState.value,
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

	const modalHandler = () => {
		setModalIsOpen(false);
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
		<>
			{modalMessage && modalIsOpen && (
				<Modal
					title={modalMessage.title}
					message={modalMessage.message}
					onCloseModal={modalHandler}
				/>
			)}
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
