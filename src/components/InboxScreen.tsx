import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TaskList from './TaskList';
import { RootState } from '../lib/redux';

interface StateProps {

}

interface DispatchProps {

}

interface OwnProps {
    error: String;
}

export type PureInboxScreenProp = StateProps & DispatchProps & OwnProps;

export function PureInboxScreen({ error = '' }: PureInboxScreenProp) {
  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <div className="title-message">Oh no!</div>
          <div className="subtitle-message">Something went wrong</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">
          <span className="title-wrapper">Taskbox</span>
        </h1>
      </nav>
      <TaskList loading={false}/>
    </div>
  );
}

// PureInboxScreen.propTypes = {
//   /** The error message */
//   error: PropTypes.string,
// };

// PureInboxScreen.defaultProps = {
//   error: null,
// };

const mapState = (state: RootState) => ({ 
    
});

const mapDispatch = {

}

// export default connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch, ({ error }) => ({ error }))(PureInboxScreen);
export default connect()(PureInboxScreen);