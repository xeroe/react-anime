// @flow
import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import omit from 'lodash.omit';
import functions from 'lodash.functions';
import { childrenId } from '../utils/PropTypes';
import isValidChild from '../utils/IsValidChild';

const anime = typeof window !== 'undefined' ? require('animejs') : _ => _;

class Anime extends Component {
  props: AnimeProps;

  targets: any[];

  constructor(props: AnimeProps) {
    super(props);

    // Current Anime DOM Targets
    this.targetsMap = {};
  }

  componentDidMount() {
    this.createAnime();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(
      omit(this.props, functions(this.props), 'children'),
      omit(nextProps, functions(nextProps), 'children'),
    )) {
      this.createAnime(nextProps);
    }
  }

  createAnime = (props = this.props) => {
    const targets = Object.values(this.targetsMap);
    const animeProps = { targets, ...props };

    anime.remove(targets);
    delete animeProps.children;

    if (typeof this.anime === 'undefined') {
      this.anime = anime(animeProps);
    } else {
      this.anime = anime(animeProps);
    }
  };

  addTarget = (node, element) => {
    const { id } = element.props;
    if (node !== null) {
      this.targetsMap[id] = node;
    } else {
      delete this.targetsMap[id];
    }
  };

  /**
   * Render children
   */
  render() {
    let { children } = this.props;
    if (!Array.isArray(children)) children = [children];
    return (
      children.map((child) => {
        if (isValidChild(child)) {
          return React.cloneElement(
            child,
            { ref: ref => this.addTarget(ref, child), key: child.props.id },
          );
        }
        return null;
      })
    );
  }
}

Anime.propTypes = { children: childrenId };

Anime.defaultProps = { children: [] };

export default Anime;
