import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import Avatar from '../../shared/components/UIElements/Avatar';
import './UserItem.css';

const UserItem = ({ id, name, image, placeCount }) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={image} alt={name} width={100} style={{ borderRadius: '50%' }} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>{placeCount} {placeCount.length === 1 ? 'Place' : 'Places'}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;

