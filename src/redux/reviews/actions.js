import Http from "../../http-service";
import {
    GET_REVIEWS_PENDING,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAILED,
    SORT_REVIEWS_BY_DATE,
    SORT_REVIEWS_BY_RATING
} from 'Constants/actionTypes';

export const getReviews = () => {
    return dispatch => {
        dispatch({type: GET_REVIEWS_PENDING});
        Http.get("/reviews")
          .then(response => response.data ? dispatch(getReviewsSuccess(response.data)) : dispatch(getReviewsFailed('No Reviews')))
          .catch(err => dispatch(getReviewsFailed('Can\'t Find Reviews, Please Sign In Again')))
    }
};

export const getReviewsSuccess = (data) => {
    return {
        type: GET_REVIEWS_SUCCESS,
        payload: data
    }
};

export const getReviewsFailed = (error) => {
    return {
        type: GET_REVIEWS_FAILED,
        payload: error
    }
};

export const sortBy = (column) => {
    switch(column) {
        case 'date': return { type: SORT_REVIEWS_BY_DATE};
        case 'rating': return { type: SORT_REVIEWS_BY_RATING};
        default: return null;
    }
}

