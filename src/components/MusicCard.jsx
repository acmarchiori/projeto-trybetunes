import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    checked: false,
    isLoading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.getFavorite();
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const newValue = (type === 'checkbox' ? target.checked : target.value);
    this.setState({
      [name]: newValue,
    }, this.fetchFavorite);
  };

  getFavorite = async () => {
    const { favoriteSongs } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      const favList = await getFavoriteSongs();
      this.setState({
        isLoading: false,
        favoriteSongs: favList,
      });
      return favoriteSongs;
    });
  };

  fetchFavorite = async () => {
    const { musics } = this.props;
    this.setState({
      isLoading: true,
    }, async () => {
      await addSong(musics);
      this.setState({
        isLoading: false,
      });
    });
  };

  list = () => {
    const { checked } = this.state;
    const { musics, isFavorite } = this.props;
    if (isFavorite) {
      this.setState({ checked: true });
    }
    return (
      <div>
        <li>
          <p>
            { musics.trackNumber }
            {' '}
            -
            {' '}
            { musics.trackName }
          </p>
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
              checked={ checked }
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
}.isrequired;

export default MusicCard;
