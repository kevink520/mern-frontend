import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.css';  

const UpdatePlace = props => {
  const [loadedPlace, setLoadedPlace] = useState();
  const { userId } = useContext(AuthContext);
  const { placeId } = useParams();
  const history = useHistory();
  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: false,
    },
    description: {
      value: '',
      isValid: false,
    },
  }, false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const { place } = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
        setLoadedPlace(place);
      } catch (err) {}
    };

    fetchPlace();
  }, [sendRequest, placeId]);

  useEffect(() => {
    if (loadedPlace) {
      setFormData({
        title: {
          value: loadedPlace.title,
          isValid: true,
        },
        description: {
          value: loadedPlace.description,
          isValid: true,
        },
      }, true);
    }
  }, [setFormData, loadedPlace]);

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        { 'Content-Type': 'application/json' }
      );

      history.push(`/${userId}/places`);
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal
        error={error}
        onError={clearError}
      />
      <form
        className="place-form"
        onSubmit={placeUpdateSubmitHandler}
      >
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={loadedPlace.title}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description. (min length: 5)"
          onInput={inputHandler}
          initialValue={loadedPlace.description}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
      </form>
    </>
  );
};

export default UpdatePlace;

