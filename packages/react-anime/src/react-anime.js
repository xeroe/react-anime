import React, { Component } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import isEqual from 'lodash.isequal';
import omit from 'lodash.omit';
import functions from 'lodash.functions';
const anime = typeof window !== 'undefined' ? require('animejs') : _ => _;


export class Anime extends Component {
  props: AnimeProps;

  targets: any[];

  constructor(props: AnimeProps) {
    super(props);

    // Current Anime DOM Targets
    this.targets = [];
  }

  componentDidMount() {
    this.createAnime();
  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(
      omit(this.props, functions(this.props), 'children'),
      omit(nextProps, functions(nextProps), 'children')
    )) {
      this.createAnime(nextProps);      
    }
  }

  createAnime = (props = this.props) => {
    let animeProps = { targets: this.targets, ...props };

    anime.remove(this.targets);
    delete animeProps.children;

    if (typeof this.anime === undefined)
      this.anime = anime(animeProps);
    else {
      this.anime = anime(animeProps);
    }
  };

  addTarget = newTarget => {
    this.targets = [...this.targets, newTarget];
  };

  /**
   * Render children
   */
  render() {
    let { style, children } = this.props;
    if (!Array.isArray(children)) children = [children];

    return (
      <g style={{ ...style }}>
        {children.map((child, i) =>
          React.cloneElement(child, { key: i, ref: this.addTarget }))}
      </g>
    );
  }
}

class TransitionWrapper extends Component {
  /**
   * Manually notify the transition of completion
   */
  animComplete = () => {
    if(this.transitionDone != undefined) {
      this.transitionDone();
    }
  }
  render() {
    return (
      <Transition {...this.props} addEndListener={(node, done) => this.transitionDone = done}>
        {(status) => (
          <Anime 
            {...(this.props.in ? this.props.enterAnim : this.props.exitAnim)}
            complete={this.animComplete}
          >
            {this.props.children}
          </Anime>
        )}
      </Transition>
    );
  }
}

export class AnimeTransition extends Component {    
    render() {
      let { enterAnim, exitAnim, children, ...otherProps } = this.props;
      if (!Array.isArray(children)) children = [children];
  
      return (
        <TransitionGroup {...otherProps}>     
          {children.map((child, i) => (
            <TransitionWrapper key={child.key} enterAnim={enterAnim} exitAnim={exitAnim}>
              {child}
            </TransitionWrapper>
          ))}
        </TransitionGroup>
      );
    }
}

export default Anime;
