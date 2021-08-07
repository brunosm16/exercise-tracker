import PropTypes from 'prop-types';
import styles from './Select.module.css';

const Select = ({ id, label, options, onChange }) => (
	<div className={styles.container}>
		<label htmlFor={id}>{label}</label>
		<select id={id} name={id} onChange={onChange}>
			{options.map((option) => (
				<option key={option} value={option}>{option}</option>
			))}
		</select>
	</div>
);

Select.defaultProps = {
	id: '',
	label: '',
	options: [],
	onChange: () => {},
};

Select.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func,
};

export default Select;
