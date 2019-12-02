import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [{
    id: 'u1',
    name: 'Sam Schwartz',
    image: 'https://i.pravatar.cc/300?v=1',
    places: 3,
  }, {
    id: 'u2',
    name: 'Avery K.',
    image: 'https://i.pravatar.cc/300?v=2',
    places: 1,
  }, {
    id: 'u3',
    name: 'Angel Lee',
    image: 'https://i.pravatar.cc/300?v=3',
    places: 1,
  }];

  return (
    <UsersList items={USERS} />
  );
};

export default Users;

