import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/favorites.css';

class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.getFavorite();
  }

  updateFavoriteSongs = (update) => {
    this.setState({ favoriteSongs: update });
  };

  getFavorite = async () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const favList = await getFavoriteSongs();
      this.setState({
        isLoading: false,
        favoriteSongs: favList,
      });
    });
  };

  removeFavorite = async () => {
    const { musics } = this.props;
    this.setState({ isLoading: true,
    }, async () => {
      await removeSong(musics);
      this.setState({
        isLoading: false,
      });
    });
    return this.removeFavorite;
  };

  render() {
    const {
      isLoading,
      favoriteSongs,
    } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="page-favorites-background">
          <h2>Músicas favoritas:</h2>
        </div>
        <div className="page-favorites">
          <ul>
            {
              isLoading
                ? <Loading />
                : favoriteSongs.map((music) => (
                  <MusicCard
                    key={ music.trackId }
                    musics={ music }
                    updateFavoriteSongs={ this.updateFavoriteSongs }
                  />
                ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  musics: PropTypes.obj,
  isFavorite: PropTypes.bool,
}.isrequired;

export default Favorites;
