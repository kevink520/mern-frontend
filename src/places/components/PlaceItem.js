import React, { useState, useContext } from 'react';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PlaceItem.css';

const PlaceItem = ({
  id,
  image,
  title,
  address,
  description,
  coordinates,
  creatorId,
  onDelete,
}) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { userId, token } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const openMapHandler = () => {
    window.scrollTo(0, 0);
    setShowMap(true);
  };

  const closeMapHandler = () => setShowMap(false);
  const showDeleteWarningHandler = () => {
    window.scrollTo(0, 0);
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => setShowConfirmModal(false);
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${id}`,
        'DELETE',
        null,
        { Authorization: `Bearer ${token}` }
      );

      onDelete(id);
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal
        error={error}
        onClear={clearError}
      />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={(
          <>
            <Button inverse info onClick={cancelDeleteHandler} style={{ marginRight: '1rem' }}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
          </>
        )}
      >
        <p style={{ width: '50rem', maxWidth: '100vw', padding: '1rem 1.5rem' }}>Do you want to proceed and delete this place? Please note that this can't be undone thereafer.</p>
      </Modal>
      <div className="place-item">
        <Card className="place-item__content">
          {isLoading &&
          <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img src={image} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button onClick={openMapHandler} inverse>VIEW ON MAP</Button>
            {userId === creatorId && (
            <>
              <Button to={`/places/${id}`}>EDIT</Button>
              <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
            </>)}
          </div>
        </Card>
      </div>
    </>
  );
};

export default PlaceItem;

