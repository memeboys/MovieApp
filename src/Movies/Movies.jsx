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
              img={movie.poster_path}
              title={movie.title}
              release_date={movie.release_date}
              overview={movie.overview}
            />
          );
        })}
      </div>
    );
  }
}
