import Cookies from 'js-cookie';
import { CLIENT_ID, OAUTH_TOKEN, REDIRECT_URI } from '../../constants/authentification';
import * as actionTypes from '../../constants/actionTypes';
import { apiUrl } from '../../services/api';
import { browse, dashboard } from '../../constants/pathnames';
import { fetchFollowings, fetchActivities, fetchFollowers, fetchFavorites } from '../../actions/user';

function setSession(session) {
  return {
    type: actionTypes.SET_SESSION,
    session
  };
}

function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    user
  };
}

function resetSession() {
  return {
    type: actionTypes.RESET_SESSION
  };
}

export const login = () => (dispatch) => {
  const client_id = CLIENT_ID;
  const redirect_uri = REDIRECT_URI;

  SC.initialize({ client_id, redirect_uri });

  SC.connect().then((session) => {
    Cookies.set(OAUTH_TOKEN, session.oauth_token);
    dispatch(setSession(session));
    dispatch(fetchUser(session.oauth_token));
  });
}

export const logout = () => (dispatch) => {
  Cookies.remove(OAUTH_TOKEN);
  dispatch(resetSession());
}

const fetchUser = (accessToken) => (dispatch) => {
  fetch(apiUrl(`me`, '?'))
    .then(response => response.json())
    .then(me => {
      dispatch(setUser(me));
      dispatch(fetchActivities());
      dispatch(fetchFavorites(me));
      dispatch(fetchFollowings(me));
      dispatch(fetchFollowers(me));
    });
}