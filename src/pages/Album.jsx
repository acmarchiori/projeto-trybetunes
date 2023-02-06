import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';

class Album extends Component {
  render() {
    const { match } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        <MusicCard id={ match.params.id } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }),
}.isrequired;

export default Album;
