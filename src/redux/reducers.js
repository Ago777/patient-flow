import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import todoApp from './todo/reducer';
import reviewsPage from './reviews/reducer';
import surveyListApp from './surveyList/reducer';
import surveyDetailApp from './surveyDetail/reducer';
import landingPage from './landingPage/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  todoApp,
  reviewsPage,
  surveyListApp,
  surveyDetailApp,
  landingPage
});

export default reducers;