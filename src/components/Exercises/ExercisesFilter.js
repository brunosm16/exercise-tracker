import PropTypes from 'prop-types';
import styles from './ExercisesFilter.module.css';
import Select from '../UI/Select/Select';

const ExercisesFilter = ({ onSelectedFilter, select, levelOptions }) => {
	const handleDropdownChange = (event) => {
		onSelectedFilter(event.target.value);
	};

	return (
		<Select
			id="level"
			label="filter by level"
			onChange={handleDropdownChange}
			selected={select}
			options={levelOptions}
			cssClass={styles['filter-select']}
		/>
	);
};

ExercisesFilter.defaultProps = {
	onSelectedFilter: () => {},
	select: '',
	levelOptions: [],
};

ExercisesFilter.propTypes = {
	onSelectedFilter: PropTypes.func,
	select: PropTypes.string,
	levelOptions: PropTypes.arrayOf(PropTypes.array),
};

export default ExercisesFilter;
