const initialState = [];

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'SEARCH_RESULT':
        return payload;

    case 'SEARCH_CLEAR':
    return state = [];

    default:
        return state
    };
};
