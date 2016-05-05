import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { TrackPreviewContainer } from '../../components/Track';
import { UserPreviewContainer } from '../../components/User';
import { MoreButton } from '../../components/MoreButton';

function Chevron({ ids, isExpanded }) {
  const chevronClass = classNames(
    'fa',
    {
      'fa-chevron-up': isExpanded,
      'fa-chevron-down': !isExpanded
    }
  );

  if (ids.length > 4) {
    return <i className={chevronClass}></i>;
  } else {
    return <span></span>;
  }
}

function SpecificItemTrack({ entities, trackId }) {
  return (
    <li>
      <TrackPreviewContainer activity={entities[trackId]} />
    </li>
  );
}

function SpecificItemUser({ entities, userId }) {
  return (
    <li>
      <UserPreviewContainer user={entities[userId]} />
    </li>
  );
}

function SpecificList({ ids, kind, requestInProcess, entities }) {
  if (!ids) {
    const isLoading = !ids || requestInProcess;
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (kind === 'USER') {
    return (
      <div className="list-content">
        <ul>
          {map((id, idx) => {
            const props = { userId: id, entities };
            return <SpecificItemUser key={idx} { ...props } />;
          }, ids)}
        </ul>
      </div>
    );
  }

  if (kind === 'TRACK') {
    return (
      <div className="list-content">
        <ul>
          {map((id, idx) => {
            const props = { trackId: id, entities };
            return <SpecificItemTrack key={idx} { ...props } />;
          }, ids)}
        </ul>
      </div>
    );
  }
}

function List({
  ids,
  isExpanded,
  title,
  kind,
  requestInProcess,
  entities,
  toggleMore,
  nextHref,
  fetchMore
}) {
  const listClass = classNames({
    'more-visible': isExpanded
  });

  return (
    <div className="list">
      <h2>
        <button className="inline" onClick={toggleMore}>
          {title} <Chevron ids={ids} isExpanded={isExpanded} />
        </button>
      </h2>
      <div className={listClass}>
        <SpecificList
          ids={ids}
          kind={kind}
          requestInProcess={requestInProcess}
          entities={entities}
        />
        <MoreButton
          nextHref={nextHref}
          onClick={fetchMore}
          requestInProcess={requestInProcess}
          isHidden={!isExpanded}
        />
      </div>
    </div>
  );
}

List.propTypes = {
  ids: React.PropTypes.array,
  isExpanded: React.PropTypes.bool,
  title: React.PropTypes.string,
  kind: React.PropTypes.string,
  requestInProcess: React.PropTypes.bool,
  entities: React.PropTypes.object,
  toggleMore: React.PropTypes.func,
  nextHref: React.PropTypes.string,
  fetchMore: React.PropTypes.func
};

export {
  List,

  SpecificList,
  Chevron,
};
