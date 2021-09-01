import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import ExerciseDate from './ExerciseDate';
import Button from '../UI/Button/Button';
import styles from './ExerciseItem.module.css';
import ExercisesContext from '../../context/exercises-context';
import UseHttp from '../../hooks/use-http';
import UseIsMounted from '../UtilsComponents/UseIsMounted';
import { URL_SERVER } from '../../utils/Utils';
import Modal from '../UI/Modal/Modal';

const ExerciseItem = ({ id, name, level, date }) => {
	const exercisesCtx = useContext(ExercisesContext);
	const isMounted = UseIsMounted();
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const transformsExercises = () => {
		if (isMounted.current) {
			exercisesCtx.onDeleteExercise(id);
		}
	};

	const openCloseModal = (hasError) => {
		setModalIsOpen(hasError);
	}

	const { isLoading, requestError, sendRequest: deleteExercise } = UseHttp();

	const handleDelete = () => {
		deleteExercise(
			{
				url: `${URL_SERVER}/exercises/${id}`,
				method: 'DELETE',
				headers: {
					'Content-Types': 'application/json',
				},
			},
			transformsExercises,
			openCloseModal
		);
	};

	let modalMessage;

	const modalHandler = () => {
		setModalIsOpen(false);
	};

	if (isLoading) {
		modalMessage = {
			title: 'Loading',
			message: 'Your request is loading',
		};
	}

	if (requestError) {
		modalMessage = {
			title: 'Error occurred',
			message: 'An error occurred while trying to process your request',
		};
	}

	return (
		<>
			{modalMessage && modalIsOpen && (
				<Modal
					title={modalMessage.title}
					message={modalMessage.message}
					onCloseModal={modalHandler}
				/>
			)}
			<li className={styles.item}>
				<div className={styles['item-container']}>
					<div className={styles.info}>
						<p>{name}</p>
						<span className={styles.divider} />
						<p className={styles.level}>{level}</p>
					</div>

					<ExerciseDate date={date} />

					<div className={styles.actions}>
						<Button isSubmit onClick={handleDelete}>
							✖
						</Button>

						<Button isSubmit onClick={() => exercisesCtx.onSetId(id)}>
							✎
						</Button>
					</div>
				</div>
			</li>
		</>
	);
};

ExerciseItem.defaultProps = {
	id: '',
	name: '',
	level: '',
	date: '',
};

ExerciseItem.propTypes = {
	name: PropTypes.string,
	level: PropTypes.string,
	date: PropTypes.objectOf(PropTypes.object),
	id: PropTypes.number,
};

export default ExerciseItem;
