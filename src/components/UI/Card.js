import PropTypes from 'prop-types';

import './Card.css';

const Card = ({ cssClass, children }) => {
	const classes = `card ${cssClass}`;
	return <div className={classes}>{children}</div>;
};

Card.defaultProps = {
	cssClass: '',
	children: {},
};

Card.propTypes = {
	cssClass: PropTypes.string,
	children: PropTypes.node,
};

export default Card;
