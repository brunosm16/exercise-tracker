import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import styles from './ExercisesFilter.module.css';
import Select from '../UI/Select/Select';
import ExercisesContext from '../../context/exercises-context';
import UseHttp from '../../hooks/use-http';

const URL = 'http://localhost:3000';

const ExercisesFilter = ({ onSelectedFilter, select }) => {
	const exerciseCtx = useContext(ExercisesContext);

	const transformLevels = (data) => {
		/* Extract the levels from JSON */
		const levels = data.map((currLevel) => currLevel.level);
		levels.forEach((level) => {
			exerciseCtx.onAddLevel(level);
		});
	};

	const {
		isLoading,
		requestError,
		sendRequest: fetchLevels,
	} = UseHttp(
		{
			url: `${URL}/exercises_levels`,
			headers: {
				'Content-Types': 'application/json',
			},
		},
		transformLevels
	);

	useEffect(() => {
		fetchLevels();
	}, [fetchLevels]);

	const handleDropdownChange = (event) => {
		onSelectedFilter(event.target.value);
	};

	let content;

	if (isLoading) {
		content = (
			<p className={`${styles.msg} ${styles['loading-msg']}`}>Loading... </p>
		);
	}

	if (requestError) {
		content = (
			<p className={`${styles.msg} ${styles['error-msg']}`}>
				An error ocurred while trying to load levels
			</p>
		);
	}

	if (!requestError && !isLoading) {
		content = (
			<Select
				id="level"
				label="filter by level"
				onChange={handleDropdownChange}
				selected={select}
				levels={exerciseCtx.levels}
				cssClass={styles['filter-select']}
			/>
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
