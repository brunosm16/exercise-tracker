import styled from 'styled-components';
import PropTypes from 'prop-types';

const ExercisesFilterDiv = styled.div`
	width: 100%;
`;

const Label = styled.label`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	gap: 1rem;

	p {
		color: #fff;
		font-weight: bold;
	}

	select {
		border-radius: 12px;
		padding: 0.25rem 0.5rem;
		outline: none;
	}
`;

const ExercisesFilter = ({ onSelectedFilter, select }) => {
	const handleDropdownChange = (event) => {
		onSelectedFilter(event.target.value);
	};

	return (
		<ExercisesFilterDiv>
			<div>
				<div>
					<Label htmlFor="level">
						<p>Filter By Level</p>
						<select
							id="level"
							onChange={handleDropdownChange}
							selected={select}
						>
							<option value="Easy">Easy</option>
							<option value="Normal">Normal</option>
							<option value="Hard">Hard</option>
							<option value="Advanced">Advanced</option>
						</select>
					</Label>
				</div>
			</div>
		</ExercisesFilterDiv>
	);
};

ExercisesFilter.defaultProps = {
	onSelectedFilter: () => {},
	select: '',
};

ExercisesFilter.propTypes = {
	onSelectedFilter: PropTypes.func,
	select: PropTypes.string,
};

export default ExercisesFilter;
