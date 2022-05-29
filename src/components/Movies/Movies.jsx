import React from 'react';
import Movie from '../Movie/Movie';
import './Movies.css';

export default class Movies extends React.Component {
  render() {
    return (
      <div className="movies">
        {this.props.movies.map((movie) => {
          return (
            <Movie
              key={movie.id}
              title={movie.title}
              overview={movie.overview}
              genreIds={movie.genre_ids}
              releaseDate={movie.release_date}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
              rating={this.props.userRates[movie.id] ?? 0}
              onRate={(rate) => this.props.onMovieRate(movie, rate)}
            />
          );
        })}
      </div>
    );
  }
}
