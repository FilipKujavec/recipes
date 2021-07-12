import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createFirestoreInstance, getFirestore, reduxFirestore } from "redux-firestore"
import firebase from 'firebase/app'
import { ReactReduxFirebaseProvider, isLoaded, getFirebase } from "react-redux-firebase"
import { useSelector } from 'react-redux'
import 'firebase/storage'
import 'firebase/firestore'

import './index.scss'
import App from './App'
import reducers from './reducers'
import fbConfig from './config/fbConfig'

firebase.initializeApp(fbConfig)
firebase.firestore()

//Create store with thunk and devtools
const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})]
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(...middlewares))
const composeEnhancers = applyMiddleware(...middlewares)
const store = createStore(reducers, composeEnhancers)

const rrfConfig = {
  userProfile: 'users',
  recipes: 'recipes',
  recipePages: 'recipePages',
  useFirestoreForProfile: true,
  useFirestoreForStorageMeta: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth)

  if (!isLoaded(auth)) return <div></div>

  return children
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps} >
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);
