import { validateName } from '../../utils/Utils';

/**
 * INPUT Action Types constants
 */
const INPUT = 'INPUT_USER';
const BLUR = 'INPUT_BLUR';
const RESET = 'INPUT_RESET';

const nameReducer = (state, action) => {
	if (action.type === INPUT) {
		return { value: action.val, isValid: validateName(action.val || '') };
	}

	if (action.type === BLUR) {
		return { value: state.value, isValid: validateName(state.value) };
	}

	if (action.type === RESET) {
		return { value: '', isValid: null };
	}

	return nameReducer;
};

const inputReducer = (state, action) => {
	if (action.type === INPUT) {
		return { value: action.val, isTouched: state.isTouched };
	}

	if (action.type === RESET) {
		return { value: '', isTouched: false };
	}

	if (action.type === BLUR) {
		return { isTouched: true };
	}
	return inputReducer;
};

export default { nameReducer, inputReducer };
