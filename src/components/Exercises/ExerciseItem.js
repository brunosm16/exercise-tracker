import PropTypes from 'prop-types';
import ExerciseDate from './ExerciseDate';
import './ExerciseItem.css';

const ExerciseItem = ({ name, level, date }) => (
	<li className="exercise-item">
		<div className="exercise-item__info">
			<div className="exercise-item__name">
				<p>{name}</p>
			</div>

			<div className="exercise-item__level">
				<p>{level}</p>
			</div>
		</div>

		<ExerciseDate date={date} />
	</li>
);

ExerciseItem.defaultProps = {
	name: '',
	level: '',
	date: new Date(),
};

ExerciseItem.propTypes = {
	name: PropTypes.string,
	level: PropTypes.string,
	date: PropTypes.objectOf(PropTypes.object),
};

export default ExerciseItem;
