import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [{
    id: 'u1',
    name: 'Max Schwartz',
    image: 'https://robohash.org/random.png?set=set4',
    places: 3,
  }];

  return (
    <UsersList items={USERS} />
  );
};

export default Users;

