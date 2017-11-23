import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import TransitionWrapper from './TransitionWrapper';

class AnimeTransition extends Component {
  render() {
    let { children } = this.props;
    const { enterAnim, exitAnim, ...props } = this.props;
    if (!Array.isArray(children)) children = [children];

    return (
      <TransitionGroup {...props}>
        {children.map(child => (
          <TransitionWrapper key={child.key} enterAnim={enterAnim} exitAnim={exitAnim}>
            {child}
          </TransitionWrapper>
        ))}
      </TransitionGroup>
    );
  }
}

AnimeTransition.propTypes = {
  enterAnim: PropTypes.object,
  exitAnim: PropTypes.object,
  children: PropTypes.node.isRequired,
};

AnimeTransition.defaultProps = {
  enterAnim: {},
  exitAnim: {},
};

export default AnimeTransition;
