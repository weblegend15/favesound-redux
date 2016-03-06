import { find, findIndex } from 'lodash';
import * as actionTypes from '../constants/actionTypes';
import * as toggleTypes from '../constants/toggleTypes';
import { resetToggle } from './toggle';
import { isSameTrackAndPlaying, isSameTrack } from '../utils/player';
import { apiUrl } from '../utils/soundcloudApi';

export function setActiveTrack(activeTrackId) {
  return {
    type: actionTypes.SET_ACTIVE_TRACK,
    activeTrackId
  };
}

function setIsPlaying(isPlaying) {
  return {
    type: actionTypes.SET_IS_PLAYING,
    isPlaying
  };
}

function setTrackInPlaylist(trackId) {
  return {
    type: actionTypes.SET_TRACK_IN_PLAYLIST,
    trackId
  }
}

function removeFromPlaylist(trackId) {
  return {
    type: actionTypes.REMOVE_TRACK_FROM_PLAYLIST,
    trackId
  };
}

function deactivateTrack() {
  return {
    type: actionTypes.RESET_ACTIVE_TRACK,
    null
  }
}

function emptyPlaylist() {
  return {
    type: actionTypes.RESET_PLAYLIST,
    null
  };
}

export const clearPlaylist = () => (dispatch) => {
  dispatch(emptyPlaylist());
  dispatch(deactivateTrack());
  // dispatch(togglePlaylist(true));
  dispatch(resetToggle(toggleTypes.PLAYLIST));
}

export const activateTrack = (trackId) => (dispatch, getState) => {
  let playlist = getState().player.playlist;
  let previousActiveTrackId = getState().player.activeTrackId;
  let isCurrentlyPlaying = getState().player.isPlaying;
  let isPlaying = !isSameTrackAndPlaying(previousActiveTrackId, trackId, isCurrentlyPlaying);

  dispatch(togglePlayTrack(isPlaying));
  dispatch(setActiveTrack(trackId));

  if (!isInPlaylist(playlist, trackId)) {
    dispatch(setTrackInPlaylist(trackId));
  }
}

export const togglePlayTrack = (isPlaying) => (dispatch) => {
  dispatch(setIsPlaying(isPlaying));
}

export const addTrackToPlaylist = (track) => (dispatch, getState) => {
  let playlist = getState().player.playlist;

  if (!isInPlaylist(playlist, track.id)) {
    dispatch(setTrackInPlaylist(track.id));
  }

  if (!playlist.length) {
    dispatch(activateTrack(track.id));
  }
}

export const removeTrackFromPlaylist = (track) => (dispatch, getState) => {
  let activeTrackId = getState().player.activeTrackId;
  let isPlaying = getState().player.isPlaying;
  let isRelevantTrack = isSameTrackAndPlaying(activeTrackId, track.id, isPlaying);

  if (isRelevantTrack) {
    dispatch(activateIteratedTrack(activeTrackId, 1));
  }

  let playlistSize = getState().player.playlist.length;
  if (playlistSize < 2) {
    dispatch(deactivateTrack());
    // dispatch(togglePlaylist(true));
    dispatch(resetToggle(toggleTypes.PLAYLIST));
  }

  dispatch(removeFromPlaylist(track.id));
}

export const activateIteratedTrack = (currentActiveTrackId, iterate) => (dispatch, getState) => {
  let playlist = getState().player.playlist;
  let nextActiveTrackId = getIteratedTrack(playlist, currentActiveTrackId, iterate);

  if (nextActiveTrackId) {
    dispatch(activateTrack(nextActiveTrackId));
  } else {
    dispatch(togglePlayTrack(false));
  }
}

function getIteratedTrack(playlist, currentActiveTrackId, iterate) {
  let index = findIndex(playlist, isSameTrack(currentActiveTrackId));
  return playlist[index + iterate];
}

function isInPlaylist(playlist, trackId) {
  return find(playlist, isSameTrack(trackId));
}