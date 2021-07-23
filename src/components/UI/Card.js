import PropTypes from 'prop-types';

import './Card.css';

const Card = ({ cssClass, children }) => {
	const classes = `card ${cssClass}`;
	return <div className={classes}>{children}</div>;
};

Card.defaultProps = {
	cssClass: '',
	children: PropTypes.object,
};

Card.propTypes = {
	cssClass: PropTypes.string,
	children: PropTypes.objectOf(PropTypes.object),
};

export default Card;
