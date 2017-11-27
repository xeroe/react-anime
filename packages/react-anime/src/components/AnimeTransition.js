import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import TransitionWrapper from './TransitionWrapper';
import { childrenId } from '../utils/PropTypes';
import isValidChild from '../utils/IsValidChild';

class AnimeTransition extends Component {
  render() {
    let { children } = this.props;
    const { enterAnim, exitAnim, ...props } = this.props;
    if (!Array.isArray(children)) children = [children];

    const transitions = children.map((child) => {
      if (isValidChild(child)) {
        return (
          <TransitionWrapper key={child.props.id} enterAnim={enterAnim} exitAnim={exitAnim}>
            {child}
          </TransitionWrapper>
        );
      }
      return null;
    });

    return (
      <TransitionGroup {...props}>
        {transitions}
      </TransitionGroup>
    );
  }
}

AnimeTransition.propTypes = {
  enterAnim: PropTypes.object,
  exitAnim: PropTypes.object,
  children: childrenId,
};

AnimeTransition.defaultProps = {
  enterAnim: {},
  exitAnim: {},
  children: [],
};

export default AnimeTransition;
