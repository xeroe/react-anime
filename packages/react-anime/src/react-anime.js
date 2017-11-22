import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
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
    this.createAnime(nextProps);
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
   * Render children, and their diffs until promise of anime finishes.
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

export default Anime;
