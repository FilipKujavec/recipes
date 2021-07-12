import algolia from '../api/algolia';
import _ from 'lodash';

export const search = (inputValue, page) => async (dispatch, getFirebase, getFirestore ) => {
    const firebase = getFirebase();

    const requestOptions = {
        headers: {
        'X-Algolia-UserToken': firebase.firebase.auth.uid,
        },
        page: page,
        hitsPerPage: 10,
        facets: [
        "*", 
        "published"
        ],
        facetFilters: [
        [
            "published:true"
        ]
        ]
    }

    const response = await algolia.search(inputValue, requestOptions)

    dispatch({ type: 'SEARCH_RESULT', payload: response })
}

export const searchClear = (inputValue, page) => async (dispatch, getFirebase, getFirestore ) => {
    dispatch({ type: 'SEARCH_CLEAR' })
}

export const createRecipe = (formValues, setLoading, setSubmitSuccess, setSubmitError) => async (dispatch, getState, { getFirebase, getFirestore } ) => {
    //Creates recipe object
    const recipeData = (formValues, uid, firstName, lastName) => {
        return({   
                ...formValues,
                author: {
                    uid,
                    firstName,
                    lastName,
                },
                cookTime: null,
                imageUrl: '',
                published: false
            });
    };

    const firestore = getFirestore();
    const state = getState();

    const profile = state.firebase.profile;
    const uid = state.firebase.auth.uid;

    const data = {
        data: `<h1>${formValues.title}</h1><p>Your Recipe</p>`,
        uid: uid
    }

    let response = [];

    try {
        response[0] = await firestore.add('recipes', recipeData(formValues, uid, profile.firstName, profile.lastName));
        console.log(response[0]);
        response[1] = await firestore.set({ collection: 'recipePages', doc: response[0].id }, data);
    } catch (err) {
        //On error any partially created recipes will get deleted
        console.log(err);
        setSubmitError(true);
        response[3] = await firestore.delete({ collection: 'recipes', doc: response[0].id });
        response[4] = await firestore.delete({ collection: 'recipePages', doc: response[0].id });
        return;
    };

    setLoading(false);
    setSubmitSuccess(true);
    return response[0];
};

export const updateRecipe = (formValues, setLoading, setSubmitSuccess, setSubmitError) => async (dispatch, getState, { getFirebase, getFirestore } ) => {
    const firestore = getFirestore();
    const state = getState();

    const recipe = _.find(state.firestore.ordered.recipes, function(o) { return o.id === formValues.id });

    //If values are unchanged return
    if (formValues.title === recipe.title && formValues.cookTime === recipe.cookTime) return;

    //Removes previous errors
    setSubmitError(false);
    setLoading(true);

    const data = ({ title, cookTime }) => ({
        title,
        cookTime
    });

    let response = [];

    //Updates the title/cookTime
    try {
        response[0] = await firestore.update({ collection: 'recipes', doc: formValues.id }, data(formValues));
    } catch (err){
        console.log(err);
        setLoading(false);
        setSubmitError(true);
        return;
    };

    setLoading(false);
    setSubmitSuccess(true);
    return response[0];
};

export const deleteRecipe = (recipeId) => async (dispatch, getState, { getFirebase, getFirestore } ) => {
    const firestore = getFirestore();

    let response = [];

    //Updates the title/cookTime
    try {
        response[0] = await firestore.delete({ collection: 'recipes', doc: recipeId });
        response[1] = await firestore.delete({ collection: 'recipePages', doc: recipeId });
    } catch (err){
        console.log(err);
        return;
    };

    return response;
}

export const publishRecipe = (recipeId, publishValue, setLoading, setSubmitSuccess, setSubmitError) => async (dispatch, getState, { getFirebase, getFirestore } ) => {
    const firestore = getFirestore();
    const state = getState();

    //Removes previous errors
    setSubmitError(false);
    setLoading(true);

    const data = {
        published: publishValue
    }

    let response = [];

    //Updates the title/cookTime
    try {
        response[0] = await firestore.update({ collection: 'recipes', doc: recipeId }, data);
        response[1] = await firestore.update({ collection: 'recipePages', doc: recipeId }, data);
        console.log(response[1]);
    } catch (err){
        console.log(err);
        setLoading(false);
        setSubmitError(true);
        return;
    };

    setLoading(false);
    setSubmitSuccess(true);
    return response;
}

export const updateRecipePage = ({ data, docId }, setLoading, setSubmitSuccess, setSubmitError) => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    //Removes previous errors
    setSubmitError(false);
    setLoading(true);

    let response = [];

    //Updates the recipePage
    try {
        response[0] = await firestore.update({ collection: 'recipePages', doc: docId }, data);
    } catch (err) {
        console.log(err);
        setLoading(false);
        setSubmitError(true);
        return;
    };

    setLoading(false);
    setSubmitSuccess(true);
    return response[0];
};

export const updateProfile = ({firstName, lastName }, setLoading, setSubmitSuccess, setSubmitError) => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const state = getState();

    const profile = state.firebase.profile

    //If values are unchanged return
    if (profile.firstName === firstName && profile.lastName === lastName) return;

    //Removes previous errors
    setSubmitError(false);
    setLoading(true);

    let response = [];

    //Updates the user profile
    try {
        response[0] = await firebase.updateProfile({firstName, lastName}, true);
    } catch (err){
        console.log(err);
        setLoading(false);
        setSubmitError(true);
        return;
    };

    setLoading(false);
    setSubmitSuccess(true);
    return response[0];
};

export const createUser = ({email, password, firstName, lastName }, setRegisterError) => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()

    let response = [];

    //Updates the user profile
    try {
        response[0] = await firebase.createUser({email, password}, {firstName, lastName, avatarUrl: 'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'});
    } catch (err){
        console.log(err);
        setRegisterError(true);
        return;
    };

    return response[0];
};

export const reauthenticateUser = ({password}, setLoading, setSubmitSuccess, setSubmitError) => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const state = getState();

    const email = state.firebase.auth.email;
    const user = firebase.auth().currentUser
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    // Removes previous errors
    setSubmitError(false);
    setLoading(true);

    let response = [];
    // Updates the user profile
    try {
        response[0] = await user.reauthenticateWithCredential(credential)
    } catch (err){
        setLoading(false);
        setSubmitError(true);
        return err;
    };

    setLoading(false);
    setSubmitSuccess(true);
    return response[0];
};

export const updateEmail = ({email}, setLoading, setSubmitSuccess, setSubmitError) => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();

    // Removes previous errors
    setSubmitError(false);
    setLoading(true);

    let response = [];

    // Updates the users email
    try {
        response[0] = await firebase.updateEmail(email)
    } catch (err){
        console.log(err);
        setLoading(false);
        setSubmitError(true);
        return err;
    };

    setLoading(false);
    setSubmitSuccess(true);
    return response[0];
};

export const updatePassword = ({newPassword}, setLoading, setSubmitSuccess, setSubmitError) => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();

    const user = firebase.auth().currentUser;


    // Removes previous errors
    setSubmitError(false);
    setLoading(true);

    let response = [];

    // Updates the users password
    try {
        response[0] = await user.updatePassword(newPassword)
    } catch (err){
        console.log(err);
        setLoading(false);
        setSubmitError(err);
        return err;
    };

    setLoading(false);
    setSubmitSuccess(true);
    return response[0];
};

export const uploadAvatar = (file, setUploadError) => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const state = getState();

    const uid = state.firebase.auth.uid;


    // Removes previous errors
    setUploadError(false);

    const options = {
        progress: true,
        name: uid,
        //Sets the avatarUrl in the user profile
        metadataFactory: (uploadRes, firebase, metadata, downloadURL) => {
        return { avatarUrl: downloadURL };
        },
        documentId: uid
    };

    let response = [];

    try { 
        response[0] = await firebase.uploadFile('avatar', file, 'users', options);
    } catch (err) {
        setUploadError(err);
        return err;
    };

    return response[0];
};

export const uploadRecipeImage = (file, id, setUploadError) => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();

    console.log('HERE');

    // Removes previous errors
    setUploadError(false);

    const options = {
        progress: true,
        name: id,
        //Sets the imageUrl in the recipe doc
        metadataFactory: (uploadRes, firebase, metadata, downloadURL) => {
        return { imageUrl: downloadURL };
        },
        documentId: id
    };

    let response = [];

    try { 
        response[0] = await firebase.uploadFile('recipeImage', file, 'recipes', options);
        console.log(response[0]);
    } catch (err) {
        setUploadError(err);
        return err;
    };

    return response[0];
};