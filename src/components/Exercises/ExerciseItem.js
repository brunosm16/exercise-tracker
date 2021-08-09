import PropTypes from 'prop-types';
import ExerciseDate from './ExerciseDate';
import Button from '../UI/Button/Button';
import styles from './ExerciseItem.module.css';

const ExerciseItem = ({ id, name, level, date, onItemClick }) => {
	const handleClick = (isDelete) => {
		onItemClick(id, isDelete);
	};

	return (
		<li className={styles.item}>
			<div className={styles.info}>
				<p>{name}</p>
				<span className={styles.divider}/>
				<p className={styles.level}>{level}</p>
			</div>

			<ExerciseDate date={date} />

			<div className={styles.actions}>
				<Button isSubmit onClick={() => handleClick(true)}>
					❌
				</Button>

				<Button isSubmit onClick={() => handleClick(false)}>
					✏️
				</Button>
			</div>
		</li>
	);
};

ExerciseItem.defaultProps = {
	id: '',
	name: '',
	level: '',
	date: '',
	onItemClick: () => {},
};

ExerciseItem.propTypes = {
	name: PropTypes.string,
	level: PropTypes.string,
	date: PropTypes.objectOf(PropTypes.object),
	id: PropTypes.number,
	onItemClick: PropTypes.func,
};

export default ExerciseItem;
