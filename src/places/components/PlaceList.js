import React from 'react';
import Masonry from 'react-masonry-css';
import PlaceItem from './PlaceItem';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './PlaceList.css';

const PlaceList = ({ items, onDeletePlace }) => {
  if (items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2 style={{ marginBottom: '2rem' }}>No places found. Maybe create one?</h2>
          <Button style={{ display: 'inline-block', marginBottom: '1rem' }} to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <Masonry
      breakpointCols={3}
      className="place-list"
      columnClassName="place-list__column"
    >
    {items.map(place => (
      <PlaceItem 
        key={place.id}
        id={place.id}
        image={place.image}
        title={place.title}
        description={place.description}
        address={place.address}
        creatorId={place.creator}
        coordinates={place.location}
        onDelete={onDeletePlace}
      />
    ))}
    </Masonry>
  );
};

export default PlaceList;

