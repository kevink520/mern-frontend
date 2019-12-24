import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './UserPlaces.css';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const { places } = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        setLoadedPlaces(places);
      } catch (err) {}
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
  };

  return (
    <>
      <ErrorModal
        error={error}
        onClear={clearError}
      />
      {isLoading &&
      <div className="center">
        <LoadingSpinner />
      </div>}
      {!isLoading && loadedPlaces &&
      <PlaceList
        items={loadedPlaces}
        onDeletePlace={placeDeleteHandler}
      />}
    </>
  );
};


export default UserPlaces;

