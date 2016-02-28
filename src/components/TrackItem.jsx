import React from 'react';
import Actions from '../components/Actions';
import { isSameTrackAndPlaying, isSameTrack } from '../utils/player';

export default class TrackItem extends React.Component {

  constructor(props) {
    super(props);
  }

  renderImage(artwork_url, title, avatar_url) {
    return <img src={artwork_url || avatar_url} alt={title} height="40" width="40"/>;
  }

  render() {
    const { activity, activateTrack, addTrackToPlaylist, isPlaying, activeTrackId, userEntities } = this.props;
    const { avatar_url, username } = userEntities[activity.user];

    const isVisible = isSameTrack(activeTrackId)(activity.id);
    const trackIsPlaying = isSameTrackAndPlaying(activeTrackId, activity.id, isPlaying);
    const configuration = [
      {
        className: trackIsPlaying ? 'fa fa-pause' : 'fa fa-play',
        fn: () => activateTrack(activity.id),
      },
      {
        className: 'fa fa-th-list',
        fn: () => addTrackToPlaylist(activity)
      }
    ];

    return (
      <div className="item">
        <div>
          {this.renderImage(activity.artwork_url, activity.title, avatar_url)}
        </div>
        <div className="item-content">
          <div className="item-content-name">
            <a href={activity.permalink_url}>
              {username} - {activity.title}
            </a>
          </div>
          <div className="item-content-info">
            <div className="item-content-info-item">
              <i className="fa fa-play"></i>&nbsp;{activity.playback_count}
            </div>
            <div className="item-content-info-item">
              <i className="fa fa-heart"></i>&nbsp;{activity.favoritings_count}
            </div>
            <div className="item-content-info-item">
              <i className="fa fa-comment"></i>&nbsp;{activity.comment_count}
            </div>
          </div>
          <Actions configuration={configuration} isVisible={isVisible} />
        </div>
      </div>
    );
  }
}
