import PropTypes from 'prop-types';
import styles from './ChartBar.module.css';

const ChartBar = ({ label, value, maxValue }) => {
	let heightToFill = '0%';

	if (maxValue > 0) {
		heightToFill = `${(value / maxValue) * 100}%`;
	}

	return (
		<div className={styles['chart-bar']}>
			<div className={styles['chart-bar__bar']}>
				<div
					className={styles['chart-bar__toFill']}
					style={{ height: heightToFill }}
				/>
			</div>

			<div className={styles['chart-bar__label']}>
				<p>{label}</p>
			</div>
		</div>
	);
};

ChartBar.defaultProps = {
	label: '',
	value: 0,
	maxValue: 0,
};

ChartBar.propTypes = {
	label: PropTypes.string,
	value: PropTypes.number,
	maxValue: PropTypes.number,
};

export default ChartBar;
