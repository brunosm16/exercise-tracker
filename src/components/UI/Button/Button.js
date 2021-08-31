import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ isSubmit, disabled, onClick, cssClass, children }) => (
	<button
		type={isSubmit ? 'submit' : 'button'}
		disabled={disabled}
		onClick={onClick}
		className={`${styles.button} ${cssClass}`}
	>
		{children}
	</button>
);

export default Button;

Button.defaultProps = {
	isSubmit: true,
	disabled: false,
	onClick: () => {},
	cssClass: '',
	children: {},
};

Button.propTypes = {
	isSubmit: PropTypes.bool,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	cssClass: PropTypes.string,
	children: PropTypes.node,
};
