import PropTypes from 'prop-types';
import styles from './ExercisesFilter.module.css';

const ExercisesFilter = ({ onSelectedFilter, select }) => {
	const handleDropdownChange = (event) => {
		onSelectedFilter(event.target.value);
	};

	return (
		<div className={styles['exercises-filter']}>
			<div className={styles['exercises-filter__controls']}>
				<div className={styles['exercises-filter__control']}>
					<label htmlFor="level">
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
					</label>
				</div>
			</div>
		</div>
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
