import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    artistName: '',
    collectionName: '',
    artworkUrl100: '',
    generatedList: [],
    // checked: false,
    trackId: '',
  };

  componentDidMount() {
    this.fetchMusic();
    this.fetchFavorite();
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const newValue = (type === 'checkbox' ? target.checked : target.value);
    this.setState({
      [name]: newValue,
    });
    // console.log(target.id);
    this.setState({ trackId: target.id });
  };

  fetchFavorite = async () => {
    const { trackId } = this.state;
    const favorite = await addSong(trackId);
    return favorite;
  };

  fetchMusic = async () => {
    const { id } = this.props;
    const list = await getMusics(id);
    // console.log(list);
    this.setState({
      artistName: list[0].artistName,
      collectionName: list[0].collectionName,
      artworkUrl100: list[0].artworkUrl100,
      generatedList: list,
    });
  };

  list = () => {
    const { generatedList } = this.state;
    // console.log(generatedList);
    return (
      generatedList.slice(1).map((musics) => (
        <div key={ musics.trackNumber }>
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
            <label htmlFor="favorita">
              Favorita
              <input
                data-testid={ `checkbox-music-${musics.trackId}` }
                type="checkbox"
                name="favorita"
                id={ musics }
                // checked={ checked }
                onChange={ this.handleChange }
              />
            </label>
          </li>
        </div>
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
