import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import omit from 'lodash.omit';
import functions from 'lodash.functions';

const anime = typeof window !== 'undefined' ? require('animejs') : _ => _;

class Anime extends Component {
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
    if (!isEqual(
      omit(this.props, functions(this.props), 'children'),
      omit(nextProps, functions(nextProps), 'children'),
    )) {
      this.createAnime(nextProps);
    }
  }

  createAnime = (props = this.props) => {
    const animeProps = { targets: this.targets, ...props };

    anime.remove(this.targets);
    delete animeProps.children;

    if (typeof this.anime === 'undefined') {
      this.anime = anime(animeProps);
    } else {
      this.anime = anime(animeProps);
    }
  };

  addTarget = (newTarget) => {
    this.targets = [...this.targets, newTarget];
  };

  /**
   * Render children
   */
  render() {
    let { children } = this.props;
    if (!Array.isArray(children)) children = [children];

    return (
      children.map(child =>
        React.cloneElement(child, { ref: this.addTarget }))
    );
  }
}

export default Anime;
