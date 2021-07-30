import PropTypes from 'prop-types';
import ExerciseItem from './ExerciseItem';
import './ExercisesList.css';

const ExercisesList = ({ exercises, level }) => {
	if (exercises.length === 0) {
		return (
			<p className="empty-list-msg">
				No exercises was found with level <strong>{level}</strong>
			</p>
		);
	}

	return (
		<ul className="exercises-list">
			{exercises.map((exercise) => (
				<ExerciseItem
					key={exercise.id}
					name={exercise.name}
					level={exercise.level}
					date={exercise.date}
				/>
			))}
		</ul>
	);
};

ExercisesList.defaultProps = {
	exercises: [],
	level: '',
};

ExercisesList.propTypes = {
	exercises: PropTypes.arrayOf(PropTypes.object),
	level: PropTypes.string,
};

export default ExercisesList;
