import {
    GET_LISTINGS_PENDING,
    GET_LISTINGS_SUCCESS,
    GET_LISTINGS_FAILED,
} from 'Constants/actionTypes';

const INIT_STATE = {
    isLoading: true,
    error: null
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_LISTINGS_PENDING:
            return {...state, isLoading: true, error: null};

        case GET_LISTINGS_SUCCESS:
            return {...state, isLoading: false, ...action.payload};

        case GET_LISTINGS_FAILED:
            return {...state, isLoading: false, error: action.payload};

        default:
            return {...state};
    }
}
