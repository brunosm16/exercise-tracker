import { validateName } from '../../utils/Utils';

/**
 * INPUT Action Types constants
 */
const USER = 'INPUT_USER';
const BLUR = 'INPUT_BLUR';

const nameReducer = (state, action) => {
	if (action.type === USER) {
		return { value: action.val, isValid: validateName(action.val || '') };
	}

	if (action.type === BLUR) {
		return { value: state.value, isValid: validateName(state.value) };
	}

	return { value: '', isValid: null };
};

export default nameReducer;
