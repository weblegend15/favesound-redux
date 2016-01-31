import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

export class Dashboard extends React.Component {

  getFollowingsDom() {
    const { followings } = this.props;

    if (!followings) {
      return '';
    }

    return <ul>{followings.toJSON().map((following, idx) => {
      return (
        <li key={idx}>
          {following.username}
        </li>
      );
    })}</ul>;
  }

  render() {
    const { currentUser, session, followings } = this.props;

    if (currentUser) {
      return <div><div>{currentUser.username}</div>{this.getFollowingsDom()}</div>;
    } else {
      return <button onClick={() => this.props.initSession()}>Login</button>;
    }
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.session.get('user'),
    followings: state.user.get('followings')
  };
}

export const DashboardContainer = connect(mapStateToProps, actions)(Dashboard);