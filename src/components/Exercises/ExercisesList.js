import styled from 'styled-components';
import PropTypes from 'prop-types';
import ExerciseItem from './ExerciseItem';

const List = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
	width: 100%;
`;

const WarningMsg = styled.p`
	color: #68c5db;
	padding: 1rem;
	font-size: 1.5rem;
`;

const ExercisesList = ({ exercises, level }) => {
	if (exercises.length === 0) {
		return (
			<WarningMsg>
				No exercises was found with level <strong>{level}</strong>
			</WarningMsg>
		);
	}

	return (
		<List>
			{exercises.map((exercise) => (
				<ExerciseItem
					key={exercise.id}
					name={exercise.name}
					level={exercise.level}
					date={exercise.date}
				/>
			))}
		</List>
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
