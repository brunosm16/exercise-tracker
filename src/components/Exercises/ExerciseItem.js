import styled from 'styled-components';
import PropTypes from 'prop-types';
import ExerciseDate from './ExerciseDate';

const Item = styled.li`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	margin: 2rem;
	border-radius: 15px;
	background-color: #2e294e;
	color: #fff;
	box-shadow: 0px 4px 4px rgba(104, 197, 219, 0.5);
	transition: all 0.3s ease-in-out;
	font-weight: bold;

	p {
		font-size: 1.2rem;
	}

	&:hover {
		box-shadow: 0px 4px 4px rgba(1, 151, 246, 0.8);
	}

	@media screen and (min-width: 768px) {
		flex-direction: row;
		padding: 0.75rem 3rem;

		p {
			font-size: 1.125rem;
		}
	}
`;

const Info = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: center;

	@media screen and (min-width: 768px) {
		flex-direction: row;
		width: 60%;
	}
`;

const ExerciseItem = ({ name, level, date }) => (
	<Item>
		<Info>
			<div>
				<p>{name}</p>
			</div>

			<div>
				<p>{level}</p>
			</div>
		</Info>

		<ExerciseDate date={date} />
	</Item>
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
