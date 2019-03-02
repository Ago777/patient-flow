import {
	GET_SEO_PENDING,
	GET_SEO_SUCCESS,
	GET_SEO_FAILED,
} from 'Constants/actionTypes';

const INIT_STATE = {
	isLoading: true,
	error: null
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {

		case GET_SEO_PENDING:
			return {...state, isLoading: true, error: null};

		case GET_SEO_SUCCESS:
			return {...state, isLoading: false, ...action.payload};

		case GET_SEO_FAILED:
			return {...state, isLoading: false, error: action.payload};

		default:
			return {...state};
	}
}
