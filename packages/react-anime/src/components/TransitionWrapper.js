import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import Anime from './Anime';
import { childrenId } from '../utils/PropTypes';

class TransitionWrapper extends Component {
  /**
   * Manually notify the transition of completion
   */
  animComplete = () => {
    if (typeof this.transitionDone !== 'undefined') {
      this.transitionDone();
    }
  }

  render() {
    const { in: inProp, enterAnim, exitAnim, ...props } = this.props;
    return (
      <Transition
        in={inProp}
        {...props}
        addEndListener={(n, done) => { this.transitionDone = done; }}
      >
        <Anime
          {...(inProp ? enterAnim : exitAnim)}
          complete={this.animComplete}
        >
          {this.props.children}
        </Anime>
      </Transition>
    );
  }
}

TransitionWrapper.propTypes = {
  in: PropTypes.bool,
  enterAnim: PropTypes.object,
  exitAnim: PropTypes.object,
  children: childrenId,
};

TransitionWrapper.defaultProps = {
  in: true,
  enterAnim: {},
  exitAnim: {},
  children: [],
};

export default TransitionWrapper;
