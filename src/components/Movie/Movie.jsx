import { Rate } from 'antd';
import { format } from 'date-fns';
import React from 'react';
import Genres from '../shared/Genres';
import './Movie.css';
export default class Movie extends React.Component {
  get shortOverview() {
    const maxLength = 28;
    const shortOverview = this.props.overview.split(' ');
    if (shortOverview.length >= maxLength) {
      shortOverview.length = maxLength;
      shortOverview.push('...');
    }
    return shortOverview.join(' ');
  }

  get formattedReleaseDate() {
    const dateString = this.props.releaseDate;
    if (!dateString) return undefined;
    const date = new Date(dateString);
    return format(date, 'MMMM d, Y');
  }

  get ratingColor() {
    const voteAverage = this.props.voteAverage;
    if (voteAverage >= 7) return '#66e900';
    else if (voteAverage >= 5) return '#e9d100';
    else if (voteAverage >= 3) return '#e97e00';
    else if (voteAverage >= 0) return '#e90000';
    return undefined;
  }
  render() {
    if (screen.width >= 600) {
      return (
        <div className="movie__card movie-card">
          <img src={`https://image.tmdb.org/t/p/w200${this.props.posterPath}`}></img>
          <div className="movie-card__info">
            <div className="movie-card__head">
              <h2 className="movie-card__title">{this.props.title}</h2>
              <span className={'movie-card__head-rate'} style={{ borderColor: this.ratingColor }}>
                {this.props.voteAverage}
              </span>
            </div>
            <span className="movie-card__release-date">{this.formattedReleaseDate}</span>
            <Genres genreIds={this.props.genreIds} />
            <div className="movie-card__body-wrapper">
              <span className="movie-card__description">{this.shortOverview}</span>
            </div>
            <Rate allowHalf defaultValue={this.props.rating} count={10} onChange={this.props.onRate} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="movie__card movie-card">
          <div className="movie-card__info">
            <div className="movie-card__head">
              <img src={`https://image.tmdb.org/t/p/w200${this.props.posterPath}`}></img>
              <div className="movie-card__head-container">
                <h2 className="movie-card__title">{this.props.title}</h2>
                <span className={'movie-card__head-rate'} style={{ borderColor: this.ratingColor }}>
                  {this.props.voteAverage}
                </span>
                <span className="movie-card__release-date">{this.formattedReleaseDate}</span>
                <Genres genreIds={this.props.genreIds} />
              </div>
            </div>
            <div className="movie-card__body-wrapper">
              <span className="movie-card__description">{this.shortOverview}</span>
              <Rate allowHalf defaultValue={this.props.rating} count={10} onChange={this.props.onRate} />
            </div>
          </div>
        </div>
      );
    }
  }
}
