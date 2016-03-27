import React from 'react';
import map from 'lodash/fp/map';
import classNames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import { GENRES, DEFAULT_GENRE } from '../constants/genre';
import { browse } from '../constants/pathnames';

function Logo({ genre }) {
  return (
    <Link to={browse + '?genre=' + genre}>
      <h1>Favesound</h1>
    </Link>
  );
}

function MenuItemBrowse({ pathname, selectedGenre, genre }) {
  if (pathname !== browse) {
    return <span></span>;
  }

  const linkClass = classNames(
    'menu-item',
    {
      'menu-item-selected': genre === selectedGenre
    }
  );

  return (
    <span>
      <Link
        to={browse + '?genre=' + genre}
        className={linkClass}
      >
        {genre}
      </Link>
    </span>
  );
}

function SessionAction({ currentUser, login, logout }) {
  if (currentUser) {
    return (
      <a href="#" onClick={logout}>
        Logout
      </a>
    );
  } else {
    return (
      <a href="#" onClick={login}>
        Login
      </a>
    );
  }
}

function Header({ currentUser, genre, pathname, login, logout }) {
  return (
    <div className="header">
      <div className="header-content">
        <div>
          <Logo genre={genre} />
        </div>
        <div>
          {map((availableGenre, idx) => {
            const props = { genre: availableGenre, selectedGenre: genre, pathname };
            return <MenuItemBrowse key={idx} { ...props } />;
          }, GENRES)}
        </div>
        <div>
          <SessionAction currentUser={currentUser} login={login} logout={logout} />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    currentUser: state.session.user,
    genre: ownProps.genre,
    pathname: ownProps.pathname
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(actions.login, dispatch),
    logout: bindActionCreators(actions.logout, dispatch)
  };
}

Header.propTypes = {
  currentUser: React.PropTypes.object,
  genre: React.PropTypes.string,
  pathname: React.PropTypes.string,
  login: React.PropTypes.func,
  logout: React.PropTypes.func
};

Header.defaultProps = {
  genre: DEFAULT_GENRE
};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export {
  Header,
  HeaderContainer
};
