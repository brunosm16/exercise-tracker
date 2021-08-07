import PropTypes from 'prop-types';
import styles from './ExercisesFilter.module.css';
import Select from '../UI/Select/Select';

const ExercisesFilter = ({ onSelectedFilter, select }) => {
	const levels = ['Easy', 'Normal', 'Hard', 'Advanced'];

	const handleDropdownChange = (event) => {
		onSelectedFilter(event.target.value);
	};

	return (
		<Select
			id="level"
			label="filter by level"
			onChange={handleDropdownChange}
			selected={select}
			options={levels}
			cssClass={styles['filter-select']}
		/>
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
