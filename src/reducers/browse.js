import * as actionTypes from '../constants/actionTypes';

const initialState = {
  activitiesByGenre: [],
  activitiesByGenreNextHrefs: {},
  activitiesByGenreInProcess: false
};

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.MERGE_GENRE_ACTIVITIES:
    return mergeActivities(state, action.activities);
  case actionTypes.SET_ACTIVITIES_BY_GENRE_REQUEST_IN_RPOCESS:
    return setActivitiesByGenreInProcess(state, action.inProcess);
  case actionTypes.SET_ACTIVITIES_BY_GENRE_NEXT_HREF:
    return setActivitiesByGenreNextHref(state, action.nextHref, action.genre);
  }
  return state;
}

function mergeActivities(state, activities) {
  const activitiesByGenre = [
    ...state.activitiesByGenre,
    ...activities
  ];
  return Object.assign({}, state, { activitiesByGenre });
}

function setActivitiesByGenreInProcess(state, activitiesByGenreInProcess) {
  return Object.assign({}, state, { activitiesByGenreInProcess });
}

function setActivitiesByGenreNextHref(state, nextHref, genre) {
  const obj = {};
  obj[genre] = nextHref;
  const activitiesByGenreNextHrefs = Object.assign({}, state.activitiesByGenreNextHrefs, obj);
  return Object.assign({}, state, { activitiesByGenreNextHrefs });
}