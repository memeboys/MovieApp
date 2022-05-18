import React from 'react';
import './Movie.css';

export default class Movie extends React.Component {
  render() {
    return (
      <div className="movie__card movie-card">
        <img src={`https://image.tmdb.org/t/p/w200${this.props.img}`}></img>
        <div className="movie-card__info">
          <div className="movie-card__header">
            <h2 className="movie-card__title">{this.props.title}</h2>
          </div>
          <span className="movie-card__release">{this.props.release_data}</span>
          <div className="movie-card__body-wrapper">
            <span className="movie-card__description">{this.props.overview}</span>
          </div>
        </div>
      </div>
    );
  }
}
