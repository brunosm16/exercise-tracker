import PropTypes from 'prop-types';
import styles from './Select.module.css';

const Select = ({ id, label, options, onChange, selected, cssClass }) => (
	<div className={`${styles.container} ${cssClass}`}>
		<label htmlFor={id}>{label}</label>
		<select id={id} name={id} onChange={onChange} value={selected}>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	</div>
);

Select.defaultProps = {
	id: '',
	label: '',
	options: [],
	onChange: () => {},
	selected: '',
	cssClass: '',
};

Select.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func,
	selected: PropTypes.string,
	cssClass: PropTypes.string,
};

export default Select;
