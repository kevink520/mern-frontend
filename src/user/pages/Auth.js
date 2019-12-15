import React, { useState, useContext } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook.js';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = (props) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { login } = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    },
  },
  false);

  const authSubmitHandler = async event => {
    event.preventDefault();
    if (isLoginMode) {

    } else {
      setIsLoading(true);
      console.log(formState)
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        login();
      } catch (err) {
        console.log(err);
        setError(err.message || 'Something went wrong. Please try again.');
        setIsLoading(false);
      }
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined,
      }, formState.inputs.email.isValid && formState.inputs.password.isValid);
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false,
        },
      }, false);
    }

    setIsLoginMode(prevMode => !prevMode);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={errorHandler} />}
      {isLoading && <LoadingSpinner asOverlay />}
      <form
        className="auth form"
        onSubmit={authSubmitHandler}
      >
        <h2>Sign-in Required</h2>
        {!isLoginMode &&
        <Input
          id="name"
          element="input"
          type="text"
          label="Your Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter your name."
          onInput={inputHandler}
        />}
        <Input
          id="email"
          element="input"
          type="email"
          label="Your Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          id="password" 
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <Button
          disabled={!formState.isValid}
          type="submit"
        >{isLoginMode ? 'Sign In' : 'Sign Up'}</Button>
        <div style={{ marginBottom: 15 }} />
        <Button
          info
          type="button"
          onClick={switchModeHandler}
        >Switch to {isLoginMode ? 'Sign Up' : 'Sign In'}</Button>
      </form>
    </>
  );
};

export default Auth;

