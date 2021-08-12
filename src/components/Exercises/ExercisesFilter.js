import PropTypes from 'prop-types';
import styles from './ExercisesFilter.module.css';
import Select from '../UI/Select/Select';

const ExercisesFilter = ({ onSelectedFilter, select, options }) => {
	const handleDropdownChange = (event) => {
		onSelectedFilter(event.target.value);
	};

	return (
		<Select
			id="level"
			label="filter by level"
			onChange={handleDropdownChange}
			selected={select}
			options={options}
			cssClass={styles['filter-select']}
		/>
	);
};

ExercisesFilter.defaultProps = {
	onSelectedFilter: () => {},
	select: '',
	options: [],
};

ExercisesFilter.propTypes = {
	onSelectedFilter: PropTypes.func,
	select: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.string),
};

export default ExercisesFilter;
