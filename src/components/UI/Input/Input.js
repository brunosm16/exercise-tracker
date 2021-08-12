import PropTypes from 'prop-types';
import styles from './Input.module.css';

const Input = ({
	id,
	label,
	isValid,
	type,
	minLength,
	maxLength,
	onChange,
	onBlur,
	value,
	cssClass,
}) => (
	<div
		className={`${styles['input-container']} ${cssClass} ${
			!isValid && styles.invalid
		}`}
	>
		<label className={styles.label} htmlFor="id">
			{label}
		</label>
		<input
			id={id}
			type={type}
			minLength={minLength}
			maxLength={maxLength}
			onChange={onChange}
			onBlur={onBlur}
			value={value}
		/>
	</div>
);

Input.defaultProps = {
	id: '',
	label: '',
	isValid: true,
	type: '',
	minLength: 1,
	maxLength: 256,
	onChange: () => {},
	onBlur: () => {},
	value: '',
	cssClass: '',
};

Input.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	isValid: PropTypes.bool,
	type: PropTypes.string,
	minLength: PropTypes.number,
	maxLength: PropTypes.number,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	value: PropTypes.string,
	cssClass: PropTypes.string,
};

export default Input;
