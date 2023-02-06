import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';

class MusicCard extends Component {
  state = {
    artistName: '',
    collectionName: '',
    artworkUrl100: '',
    generatedList: [],
  };

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    const { id } = this.props;
    const list = await getMusics(id);
    this.setState({
      artistName: list[0].artistName,
      collectionName: list[0].collectionName,
      artworkUrl100: list[0].artworkUrl100,
      generatedList: list,
    });
  };

  list = () => {
    const { generatedList } = this.state;
    return (
      generatedList.slice(1).map((musics) => (
        <li key={ musics.trackNumber }>
          <p>{ musics.trackName }</p>
          <audio
            data-testid="audio-component"
            src={ musics.previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
        </li>
      ))
    );
  };

  render() {
    const { artistName, collectionName, artworkUrl100 } = this.state;
    return (
      <div>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h2 data-testid="album-name">{ collectionName }</h2>
        <h2 data-testid="artist-name">{ artistName }</h2>
        <div>
          <ol>
            {
              this.list()
            }
          </ol>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  id: PropTypes.string,
}.isrequired;

export default MusicCard;
