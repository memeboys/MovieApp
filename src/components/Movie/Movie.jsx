import React from 'react';
import { format } from 'date-fns';
import './Movie.css';
export default class Movie extends React.Component {
  render() {
    let finalDate;
    try {
      const date = new Date(this.props.movie.release_date);
      const formatDate = format(date, 'MMMM d, Y');
      finalDate = formatDate;
    } catch (err) {
      if (err.message === 'Invalid time value') {
        finalDate = 'Date not available :(';
      } else {
        throw new Error(err);
      }
    }
    return (
      <div className="movie__card movie-card">
        <img src={`https://image.tmdb.org/t/p/w200${this.props.movie.poster_path}`}></img>
        <div className="movie-card__info">
          <div className="movie-card__header">
            <h2 className="movie-card__title">{this.props.movie.title}</h2>
          </div>
          <span className="movie-card__release-date">{finalDate}</span>
          <div className="movie-card__body-wrapper">
            <span className="movie-card__description">{this.props.movie.overview}</span>
          </div>
        </div>
      </div>
    );
  }
}
