import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import todoApp from './todo/reducer';
import reviewsPage from './reviews/reducer';
import listingsPage from './listings/reducer';
import surveyDetailApp from './surveyDetail/reducer';
import landingPage from './landingPage/reducer';

const reducers = combineReducers({
  authUser,
  listingsPage,
  reviewsPage,
  menu,
  settings,
  todoApp,
  surveyDetailApp,
  landingPage
});

export default reducers;