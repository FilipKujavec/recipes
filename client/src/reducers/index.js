import { combineReducers } from "redux";
import { reducer as form  } from 'redux-form';
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import SearchReducer from "./SearchReducer";
import UploadReducer from "./UploadReducer";

export default combineReducers({
    searchResult: SearchReducer,
    form: form,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    uploadProgress: UploadReducer,
})