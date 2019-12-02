import React from 'react';
import { createPortal } from 'react-dom';
import Backdrop from './Backdrop';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

const ModalOverlay = ({
  className,
  style,
  headerClass,
  header,
  onSubmit,
  contentClass,
  children,
  footerClass,
  footer,
}) => {
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit || (e => e.preventDefault())}>
        <div className={`modal__content ${contentClass}`}>
          {children}
        </div>
        <footer className={`modal__footer ${footerClass}`}>
          {footer}
        </footer>
      </form>
    </div>
  );

  return createPortal(content, document.getElementById('modal-hook'));
};

const Modal = props => (
  <>
    {props.show && <Backdrop onClick={props.onCancel} />}
    <CSSTransition
      in={props.show}
      mountOnEnter
      unmountOnExit
      timeout={500}
      classNames="modal"
    >
      <ModalOverlay {...props} />
    </CSSTransition>
  </>
);

export default Modal;

