/**
 * INPUT Action Types constants
 */
const INPUT = 'INPUT_USER';
const BLUR = 'INPUT_BLUR';
const RESET = 'INPUT_RESET';

const inputReducer = (state, action) => {
	if (action.type === INPUT) {
		return { value: action.value, isTouched: state.isTouched };
	}

	if (action.type === RESET) {
		return { value: '', isTouched: false };
	}

	if (action.type === BLUR) {
		return { value: state.value, isTouched: true };
	}
	return inputReducer;
};

export default inputReducer;
