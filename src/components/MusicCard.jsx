import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
    isFavorite: false,
  };

  componentDidMount() {
    this.funcChecked();
  }

  funcChecked = async () => {
    const { musics } = this.props;
    const favorites = await getFavoriteSongs();
    if (favorites.some(({ trackId }) => musics.trackId === trackId)) {
      this.setState({ isFavorite: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, type } = target;
    const newValue = (type === 'checkbox' ? target.checked : target.value);
    this.setState(
      {
        [name]: newValue,
      },
      this.handleFavorite,
    );
  };

  handleFavorite = async () => {
    const { isFavorite } = this.state;
    const { musics, updateFavoriteSongs, isAlbum } = this.props;
    console.log(isAlbum);
    this.setState({
      isLoading: true,
    });
    if (isFavorite) {
      await removeSong(musics);
      if (!isAlbum) {
        const favorites = await getFavoriteSongs();
        updateFavoriteSongs(favorites);
      }
      this.setState({
        isFavorite: false,
      });
    } else {
      await addSong(musics);
      this.setState({
        isFavorite: true,
      });
    }
    this.setState({
      isLoading: false,
    });
  };

  list = () => {
    const { isFavorite } = this.state;
    const { musics } = this.props;
    return (
      <div>
        <li>
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
          <label htmlFor="favorite">
            Favorita
            <input
              data-testid={ `checkbox-music-${musics.trackId}` }
              type="checkbox"
              name="checked"
              id="favorite"
              checked={ isFavorite }
              onChange={ this.handleChange }
            />
          </label>
        </li>
      </div>
    );
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div>
        <ul>
          { this.list() }
        </ul>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.obj,
  isFavorite: PropTypes.bool,
}.isrequired;

export default MusicCard;
