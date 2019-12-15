import React from 'react';
import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = ({ onClear, error }) => (
  <Modal
    onCancel={onClear}
    header="An error occurred!"
    show={!!error}
    footer={<Button onClick={onClear}>Okay</Button>}
  />
);

export default ErrorModal;

