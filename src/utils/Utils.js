/**
 * Initial states
 */
export const initDate = '2021-01-01';
export const initLevel = 'Easy';

/**
 * Format 'yyyy-mm-dd' JavaScript Date
 */
export const dateToJs = (inputDate) => {
	const dateSplit = inputDate.split('-');
	return new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
};

/**
 * Insert a 0 in front of numbers lower than 0
 */
const zeroInFront = (number) => (number < 10 ? `0${number}` : `${number}`);

/**
 * Format JavaScript Date to 'yyyy-mm-dd'
 */
export const dateToHTML = (jsDate) => {
	const day = zeroInFront(jsDate.getDate());
	// JavaScript Date months starts as 0 (January)
	const month = zeroInFront(jsDate.getMonth() + 1);
	const year = jsDate.getFullYear();

	return `${year}-${month}-${day}`;
};

export const validateName = (name) => name.trim().length >= 4;

/**
 * Search for a item with an id equals to the id passed as argument
 */
export const findItemById = (id, items) =>
	items ? items.filter((exercise) => exercise.id === id)[0] : undefined;

/**
 * State passed as argument needs to have a property isValid.
 * @returns - true if state is NULL, otherwise returns value.isValid
 */
export const stateIsNull = (state) =>
	state.isValid === null ? true : state.isValid;
