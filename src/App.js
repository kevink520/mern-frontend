import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useAuth } from './shared/hooks/auth-hook';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import './App.css';

const Users = lazy(() => import('./user/pages/Users'));
const UserPlaces = lazy(() => import('./places/pages/UserPlaces'));
const NewPlace = lazy(() => import('./places/pages/NewPlace'));
const UpdatePlace = lazy(() => import('./places/pages/UpdatePlace'));
const Auth = lazy(() => import('./user/pages/Auth'));

const App = () => {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (!token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      token,
      userId,
      login,
      logout,
    }}>
      <Router>
        <MainNavigation />
        <main> 
          <Suspense fallback={<LoadingSpinner asOverlay />}>
            {routes}9
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

