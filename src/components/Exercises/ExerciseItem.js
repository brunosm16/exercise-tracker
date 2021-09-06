import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ExerciseDate from './ExerciseDate';
import Button from '../UI/Button/Button';
import styles from './ExerciseItem.module.css';
import ExercisesContext from '../../context/exercises-context';
import UseHttp from '../../hooks/use-http';
import { ENDPOINT, modalRequestError } from '../../utils/HttpUtils';
import UseIsMounted from '../../hooks/use-is-mounted';

const ExerciseItem = ({ id, name, level, date }) => {
	const exercisesCtx = useContext(ExercisesContext);
	const isMounted = UseIsMounted();

	const transformsExercises = () => {
		if (isMounted.current) {
			exercisesCtx.onDeleteExercise(id);
		}
	};

	const openCloseModal = () => {
		exercisesCtx.onOpenCloseModal(modalRequestError);
	};

	const { sendRequest: deleteExercise } = UseHttp();

	const handleDelete = () => {
		deleteExercise(
			{
				url: `${ENDPOINT}/exercises/${id}`,
				method: 'DELETE',
				headers: {
					'Content-Types': 'application/json',
				},
			},
			transformsExercises,
			openCloseModal
		);
	};

	const handleEdit = () => {
		if (isMounted.current) {
			exercisesCtx.onSetId(id);
		}
	};

	return (
		<>
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

						<Button isSubmit onClick={handleEdit}>
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
