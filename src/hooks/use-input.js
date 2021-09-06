import { useReducer } from 'react';
import inputReducer from '../context/reducers/reducers';

const defaultInputReducer = {
	value: '',
	isTouched: false,
};

const UseInput = (validateInput) => {
	const [inputState, dispatch] = useReducer(inputReducer, defaultInputReducer);

	const inputHasError = validateInput(inputState.value) && inputState.isTouched;

	const inputChangeHandler = (event) => {
		dispatch({ type: 'INPUT_USER', val: event.target.value });
	};

	const inputBlurHandler = () => {
		dispatch({ type: 'INPUT_BLUR' });
	};

	const inputResetHandler = () => {
		dispatch({ type: 'INPUT_RESET' });
	};

	return {
		value: inputState.value,
		inputHasError,
		inputChangeHandler,
		inputBlurHandler,
		inputResetHandler,
	};
};

export default UseInput;
