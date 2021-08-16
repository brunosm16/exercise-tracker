import React, { useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

const Input = React.forwardRef(
	(
		{
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
		},
		ref
	) => {
		const inputRef = useRef();

		const activate = () => {
			inputRef.current.focus();
		};

		useImperativeHandle(ref, () => ({
			focus: activate,
		}));

		return (
			<div
				className={`${styles.container} ${cssClass} ${
					!isValid && styles.invalid
				}`}
			>
				<label htmlFor="id">
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
					ref={inputRef}
				/>
			</div>
		);
	}
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
