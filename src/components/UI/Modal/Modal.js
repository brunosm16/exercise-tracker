import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import Overlay from './Overlay';

const Modal = ({ title, message, onCloseModal }) => (
	<>
		{ReactDOM.createPortal(
			<Backdrop onCloseModal={onCloseModal} />,
			document.getElementById('backdrop')
		)}

		{ReactDOM.createPortal(
			<Overlay title={title} message={message} onCloseModal={onCloseModal} />,
			document.getElementById('overlay')
		)}
	</>
);

Modal.defaultProps = {
	title: '',
	message: '',
	onCloseModal: () => {},
};

Modal.propTypes = {
	title: PropTypes.string,
	message: PropTypes.string,
	onCloseModal: PropTypes.func,
};

export default Modal;
