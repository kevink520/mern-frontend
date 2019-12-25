import React, { useState, useContext } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = (props) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
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

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const authSubmitHandler = async event => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const { user } = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );
 
        login(user.id);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append('name', formState.inputs.name.value);
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        const { user } = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          formData,
        );

        login(user.id);
      } catch (err) {}
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined,
        image: undefined,
      }, formState.inputs.email.isValid && formState.inputs.password.isValid);
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false,
        },
        image: {
          value: null,
          isValid: false,
        },
      }, false);
    }

    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
        {!isLoginMode &&
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please upload an image."
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
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
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

