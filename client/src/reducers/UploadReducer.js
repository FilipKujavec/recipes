import { actionTypes } from 'react-redux-firebase';

const initialState = {

}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.FILE_UPLOAD_PROGRESS:
        return payload.percent

    default:
        return state
    }
}
