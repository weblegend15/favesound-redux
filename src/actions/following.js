import * as actionTypes from '../constants/actionTypes';
import { apiUrl } from '../utils/soundcloudApi';
import { mergeFollowings } from '../actions/user';

function removeFromFollowings(userId) {
  return {
    type: actionTypes.REMOVE_FROM_FOLLOWINGS,
    userId
  };
}

export function follow(user) {
  return (dispatch, getState) => {

    let followings = getState().user.followings;
    let isFollowing = _.find(followings, (following) => following === user.id);

    fetch(apiUrl(`me/followings/${user.id}`, '?'), { method: isFollowing ? 'delete' : 'put' })
      .then(response => response.json())
      .then(() => {
        if (isFollowing) {
          dispatch(removeFromFollowings(user.id));
        } else {
          dispatch(mergeFollowings([user.id]));
        }
      });
  };
}
