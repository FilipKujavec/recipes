import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { omit } from 'lodash';

import { Navbar } from './Pages/Navbar';
import { About } from './Pages/About';
import { Profile } from './Pages/Profile';
import { Home } from './Pages/Home';
import { Recipe } from './Pages/Recipe';
import { EditRecipe } from './Pages/EditRecipe';
import { ManageRecipes } from './Pages/ManageRecipes';

//Restricts Acces to child elements
const SecureRoute = (props) => {
  const { isAuthEmpty, children, openLogin, cleanUpLogin } = props;
  const history = useHistory();

  //Sets RouteGuard back to null after leaving the page
  useEffect(() => {
    return () => {
      cleanUpLogin();
    };
  }, []);

  //Removes props from parent element
  const newProps = omit(props, 'isAuthEmpty', 'children', 'openLogin', 'cleanUpLogin');

  //Returns child elements if user is logged in
  if (!isAuthEmpty) {
    //Passes props to all children by mapping and cloning them
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { ...newProps });
      };
      return child;
    });
  };

  //If the user isn't logged in open Login Modal and display Error
  openLogin();
  return (
    <div className='flex justify-center mx-auto'>
      <div className='error'>
        <p className='error'>You need to Login in order to acces this Page!</p>
      </div>
    </div>
  );
};

export const App = (props) => {
  const { isAuthEmpty, isAuthLoaded } = props;
  const [RouteGuard, setRouteGuard] = useState(null);

  return (
    <Router>
      <Navbar RouteGuard={RouteGuard} /> 
          <div className='flex justify-center absolute top-0 -z-10 w-screen pb-64'>
            <div className='w-5/6 bg-white shadow-2xl drop-shadow-2xl'>
              <div className='mt-24 px-2 md:px-16 pb-16 md:mt-48 overflow-hidden' >
                <Switch>

                <Route path='/recipes/edit/:id' exact children={props =>
                  <SecureRoute {...props} isAuthEmpty={isAuthEmpty} openLogin={() => setRouteGuard(true)} cleanUpLogin={() => setRouteGuard(null)}>
                    <EditRecipe />
                  </SecureRoute>
                }/>

                <Route path='/recipes/edit' exact>
                  <SecureRoute isAuthEmpty={isAuthEmpty} openLogin={() => setRouteGuard(true)} cleanUpLogin={() => setRouteGuard(null)}>
                    <ManageRecipes />
                  </SecureRoute>
                </Route>

                <Route path='/profile' exact>
                  <SecureRoute isAuthEmpty={isAuthEmpty} openLogin={() => setRouteGuard(true)} cleanUpLogin={() => setRouteGuard(null)}>
                    <Profile />
                  </SecureRoute>
                </Route>

                <Route path='/' exact> <Home /> </Route>
                <Route path='/recipes' exact> <Home /> </Route>
                <Route path='/about' exact> <About /> </Route>
                <Route path='/recipes/:id' exact component={Recipe} />

                </Switch>
              </div>
            </div>
          </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  isAuthEmpty: state.firebase.auth.isEmpty,
  isAuthLoaded: state.firebase.auth.isLoaded
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
