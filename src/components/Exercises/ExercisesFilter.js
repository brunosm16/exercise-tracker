import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import styles from './ExercisesFilter.module.css';
import Select from '../UI/Select/Select';
import ExercisesContext from '../../context/exercises-context';

const ExercisesFilter = ({ onSelectedFilter, select }) => {
	const exerciseCtx = useContext(ExercisesContext);

	const handleDropdownChange = (event) => {
		onSelectedFilter(event.target.value);
	};

	let content = (
		<Select
			id="level"
			label="filter by level"
			onChange={handleDropdownChange}
			selected={select}
			options={exerciseCtx.levels}
			cssClass={styles['filter-select']}
		/>
	);

	if (exerciseCtx.requestError) {
		content = (
			<p className={`${styles.msg} ${styles['error-msg']}`}>
				An error occurred while trying to process exercise levels
			</p>
		);
	}
	if (exerciseCtx.isLoading) {
		content = (
			<p className={`${styles.msg} ${styles['loading-msg']}`}>
				Loading levels ....
			</p>
		);
	}

	return <>{content}</>;
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
