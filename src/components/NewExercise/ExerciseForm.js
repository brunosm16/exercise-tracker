import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ExerciseForm.module.css';

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
				date: formatDate(enteredDate),
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
				<div
					className={`${styles['exercise-form__control']} ${
						nameInvalid && styles.invalid
					}`}
				>
					<label htmlFor="name">
						<p>Name:</p>
						<input
							id="name"
							type="text"
							onChange={nameChangeHandler}
							value={enteredName}
						/>
					</label>
				</div>

				<div
					className={`${styles['exercise-form__control']} ${
						levelInvalid && styles.invalid
					}`}
				>
					<label htmlFor="level">
						<p>Level:</p>
						<input
							id="level"
							type="text"
							value={enteredLevel}
							onChange={levelChangeHandler}
						/>
					</label>
				</div>

				<div className={styles['exercise-form__control']}>
					<label htmlFor="date">
						<p>Date:</p>
						<input
							type="date"
							value={enteredDate || '2021-01-01'}
							min="2021-01-01"
							max="2025-12-12"
							onChange={dateChangeHandler}
						/>
					</label>
				</div>
			</div>

			<div className={styles['exercise-form__actions']}>
				<div className={styles['exercise-form__action']}>
					<button type="button" onClick={cancelHandler}>
						Cancel
					</button>
				</div>
				<div className={styles['exercise-form__action']}>
					<button type="submit">Add Exercise</button>
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
