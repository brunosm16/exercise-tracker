import PropTypes from 'prop-types';
import { useContext } from 'react';
import styles from './ExercisesFilter.module.css';
import Select from '../UI/Select/Select';
import ExercisesContext from '../../context/exercises-context';

const ExercisesFilter = ({ onSelectedFilter, select }) => {
	const exerciseCtx = useContext(ExercisesContext);

	const handleDropdownChange = (event) => {
		onSelectedFilter(event.target.value);
	};

	return (
		<Select
			id="level"
			label="filter by level"
			onChange={handleDropdownChange}
			selected={select}
			options={exerciseCtx.options}
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
