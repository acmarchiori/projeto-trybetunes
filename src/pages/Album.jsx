import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import '../styles/album.css';

class Album extends Component {
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
    const { match: { params: { id } } } = this.props;
    const list = await getMusics(id);
    this.setState({
      artistName: list[0].artistName,
      collectionName: list[0].collectionName,
      artworkUrl100: list[0].artworkUrl100,
      generatedList: list,
    });
  };

  render() {
    const {
      artistName,
      collectionName,
      artworkUrl100,
      generatedList,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div className="page-album-background" />
        <section className="page-album">
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h2 data-testid="album-name" className="page-album-name">{ collectionName }</h2>
          <h2 data-testid="artist-name" className="page-album-artist">{ artistName }</h2>
        </section>
        <div className="page-album-list">
          {
            generatedList.slice(1).map((music) => (
              <MusicCard
                key={ music.trackNumber }
                musics={ music }
                isAlbum={ 1 }
              />
            ))
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
