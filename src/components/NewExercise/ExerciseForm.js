import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Form = styled.form`
	width: 100%;
`;

const Controls = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 1rem;

	@media screen and (min-width: 578px) {
		padding: 0.25rem 0.75rem;
		justify-content: space-between;
	}
`;

const Label = styled.label`
	p {
		font-weight: bold;
		font-size: 1.2rem;
	}

	@media screen and (min-width: 578px) {
		p {
			font-size: 1rem;
		}
	}
`;

const Input = styled.input`
	width: 20rem;
	border-radius: 15px;
	border-color: transparent;
	outline: none;
	padding: 0.25rem 0.5rem;
	border: ${(props) =>
		props.nameInvalid || props.levelInvalid ? `2px #CC2936 solid` : ''};
	box-shadow: ${(props) =>
		props.nameInvalid || props.levelInvalid
			? `2px 8px 15px rgba(204, 41, 54, 0.8)`
			: `0 2px 5px 8px rgba(255, 255, 255, 0.083)`};

	transition: all 0.3s ease-in-out;

	&:hover {
		box-shadow: 0 2px 5px 8px rgba(255, 255, 255, 0);
	}
`;

const FormActionsDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 2rem;
	margin-bottom: 0.75rem;
	gap: 1rem;
`;

// const Label = styled.label`

// `

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
		<Form onSubmit={submitHandler}>
			<Controls>
				<div>
					<Label htmlFor="name">
						<p>Name:</p>
						<Input
							id="name"
							type="text"
							onChange={nameChangeHandler}
							value={enteredName}
							nameInvalid={nameInvalid}
						/>
					</Label>
				</div>

				<div>
					<Label htmlFor="level">
						<p>Level:</p>
						<Input
							id="level"
							type="text"
							value={enteredLevel}
							onChange={levelChangeHandler}
							levelInvalid={levelInvalid}
						/>
					</Label>
				</div>

				<div>
					<Label htmlFor="date">
						<p>Date:</p>
						<Input
							type="date"
							value={enteredDate || '2021-01-01'}
							min="2021-01-01"
							max="2025-12-12"
							onChange={dateChangeHandler}
						/>
					</Label>
				</div>
			</Controls>

			<FormActionsDiv>
				<div>
					<button type="button" onClick={cancelHandler}>
						Cancel
					</button>
				</div>
				<div className="exercise-form__action">
					<button type="submit">Add Exercise</button>
				</div>
			</FormActionsDiv>
		</Form>
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
