import React from 'react';
import Actions from '../components/Actions';
import { isSameTrackAndPlaying, isSameTrack } from '../utils/player';

export default class MiniTrack extends React.Component {

  renderImage(artwork_url, title, avatar_url) {
    return <img src={artwork_url || avatar_url} alt={title} height="40" width="40"/>;
  }

  renderActions() {
    const { activity, activeTrack, activateTrack, removeTrackFromPlaylist, isPlaying } = this.props;

    const trackIsPlaying = isSameTrackAndPlaying(activeTrack, activity, isPlaying);
    const isVisible = isSameTrack(activeTrack)(activity);

    const configuration = [
      {
        className: trackIsPlaying ? 'fa fa-pause' : 'fa fa-play',
        fn: () => activateTrack(activity),
      },
      {
        className: 'fa fa-times',
        fn: () => removeTrackFromPlaylist(activity)
      }
    ];

    return <Actions configuration={configuration} isVisible={isVisible} />;
  }

  render() {
    const { activity } = this.props;
    const { origin } = activity;

    if (!origin) { return; }

    const { user, title, permalink_url, artwork_url } = origin;
    const { avatar_url, username } = user;

    return (
      <div className="mini-track">
        <div className="mini-track-img">
          {this.renderImage(artwork_url, title, avatar_url)}
        </div>
        <div className="mini-track-content">
          <div className="mini-track-content-name">
            <a href={permalink_url}>{username} - {title}</a>
          </div>
          {this.renderActions()}
        </div>
      </div>);
    }

}
