import { useState } from 'react';
import PropTypes from 'prop-types';
import './ExerciseForm.css';

const ExerciseForm = ({ onSaveDataExerciseData, onCancelAddExercise }) => {
	const [enteredName, setEnteredName] = useState('');
	const [enteredLevel, setEnteredLevel] = useState('');
	const [enteredDate, setEnteredDate] = useState('');

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

		const exerciseData = {
			id: Math.random(),
			name: enteredName,
			level: enteredLevel,
			date: new Date(enteredDate),
		};

		// reset form values
		setEnteredName('');
		setEnteredLevel('');
		setEnteredDate('');

		// pass input data to be saved
		onSaveDataExerciseData(exerciseData);
	};

	const cancelHandler = () => {
		onCancelAddExercise();
	};

	return (
		<form className="exercise-form" onSubmit={submitHandler}>
			<div className="exercise-form__controls">
				<div className="exercise-form__control">
					<label htmlFor="name">
						<p>Name: </p>
						<input
							id="name"
							type="text"
							onChange={nameChangeHandler}
							value={enteredName}
						/>
					</label>
				</div>

				<div className="exercise-form__control">
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

				<div className="exercise-form__control">
					<label htmlFor="date">
						<p>Date:</p>
						<input
							type="date"
							value={enteredDate}
							min="2021-01-01"
							max="2025-12-12"
							onChange={dateChangeHandler}
						/>
					</label>
				</div>
			</div>

			<div className="exercise-form__actions">
				<div className="exercise-form__action">
					<button type="button" onClick={cancelHandler}>
						Cancel
					</button>
				</div>
				<div className="exercise-form__action">
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
