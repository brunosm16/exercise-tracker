import PropTypes from 'prop-types';
import { useContext } from 'react';
import ExerciseDate from './ExerciseDate';
import Button from '../UI/Button/Button';
import styles from './ExerciseItem.module.css';
import ExercisesContext from '../../context/exercises-context';

const ExerciseItem = ({ id, name, level, date }) => {
	const exercisesCtx = useContext(ExercisesContext);

	const handleClick = (isDelete) => {
		exercisesCtx.onSelectOperation(id, isDelete);
	};

	return (
		<li className={styles.item}>
			<div className={styles['item-container']}>
				<div className={styles.info}>
					<p>{name}</p>
					<span className={styles.divider} />
					<p className={styles.level}>{level}</p>
				</div>

				<ExerciseDate date={date} />

				<div className={styles.actions}>
					<Button  isSubmit onClick={() => handleClick(true)}>
						✖
					</Button>

					<Button isSubmit onClick={() => handleClick(false)}>
						✎
					</Button>
				</div>
			</div>
		</li>
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
