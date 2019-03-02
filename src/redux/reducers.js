import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import todoApp from './todo/reducer';
import reviewsPage from './reviews/reducer';
import listingsPage from './listings/reducer';
import seoPage from './seo/reducer';
import landingPage from './landingPage/reducer';

const reducers = combineReducers({
  authUser,
  listingsPage,
  reviewsPage,
  seoPage,
  menu,
  settings,
  todoApp,
  landingPage
});

export default reducers;