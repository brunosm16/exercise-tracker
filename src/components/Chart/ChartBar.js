import PropTypes from 'prop-types';
import styles from './ChartBar.module.css';

const ChartBar = ({ title, value, maxValue }) => {
	let heightToFill = '0%';

	if (maxValue > 0) {
		heightToFill = `${(value / maxValue) * 100}%`;
	}

	return (
		<div className={styles['chart-bar']}>
			<div className={styles.bar}>
				<div className={styles.toFill} style={{ height: heightToFill }} />
			</div>

			<div className={styles.title}>
				<p>{title}</p>
			</div>
		</div>
	);
};

ChartBar.defaultProps = {
	title: '',
	value: 0,
	maxValue: 0,
};

ChartBar.propTypes = {
	title: PropTypes.string,
	value: PropTypes.number,
	maxValue: PropTypes.number,
};

export default ChartBar;
