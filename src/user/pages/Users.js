import React, { useState, useEffect } from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { users } = await sendRequest(`${REACT_APP_BACKEND_URL}/users`);
        setLoadedUsers(users);
      } catch (err) {}
    };

    fetchUsers();
  }, [sendRequest]);

  //console.log('loadedUsers', loadedUsers)
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers &&
      <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;

