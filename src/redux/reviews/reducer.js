import {
    GET_REVIEWS_PENDING,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAILED,
    SORT_REVIEWS_BY_DATE,
    SORT_REVIEWS_BY_RATING
} from 'Constants/actionTypes';

const INIT_STATE = {
    isLoading: true,
    error: null
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_REVIEWS_PENDING:
            return {...state, isLoading: true, error: null};

        case GET_REVIEWS_SUCCESS:
            const {reviews} = action.payload;
            reviews.sort((a,b) => (b['rating'] || 0) - (a['rating'] || 0));

            return {...state, ...action.payload, reviews: reviews, isLoading: false};

        case GET_REVIEWS_FAILED:
            return {...state, isLoading: false, error: action.payload};

        case SORT_REVIEWS_BY_DATE: {
            const {reviews} = state;
            reviews.sort((a,b) => b['publisherDate'] - a['publisherDate']);

            return {...state, reviews: reviews};
        }

        case SORT_REVIEWS_BY_RATING: {
            const {reviews} = state;
            reviews.sort((a,b) => (b['rating'] || 0) - (a['rating'] || 0));

            return {...state, reviews: reviews};
        }


        default:
            return {...state};
    }
}
