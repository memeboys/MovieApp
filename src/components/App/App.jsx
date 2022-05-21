import { Spin } from 'antd';
import React from 'react';
import { Offline, Online } from 'react-detect-offline';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import WarningIndicator from '../WarningIndicator/WarningIndicator';

import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
      error: false,
    };
    this.handlerSearchMovie = this.handlerSearchMovie.bind(this);
  }
  async componentDidMount() {
    await this.presentTrendingMovies();
  }
  async presentTrendingMovies() {
    try {
      const movie = await this.fetchTrendingMovies();
      this.setState({ movies: movie.results, isLoading: false });
    } catch (error) {
      this.setState({ error: true, errorDescription: error.message });
      console.error(error);
    }
  }

  async fetchTrendingMovies() {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=ca57099477a2c0925544b12050bcc9d6&query=return`
    );
    if (!response.ok) {
      const messageError = 'Error with Status code: ' + response.status;
      throw new Error(messageError);
    }
    return response.json();
  }
  async handlerSearchMovie(updateValue) {
    encodeURI(updateValue);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=ca57099477a2c0925544b12050bcc9d6&query=${updateValue}`
      );
      if (!response.ok) {
        const messageError = 'Error with Status code: ' + response.status;
        throw new Error(messageError);
      }
      const movies = await response.json();
      this.setState({ movies: movies.results, isLoading: false, value: updateValue });
    } catch (error) {
      this.setState({ error: true, errorDescription: error.message });
      console.error(error);
    }
  }
  render() {
    console.log('render');
    const { movies, error, errorDescription, isLoading } = this.state;
    return (
      <div className="container">
        <Online>
          {error ? <ErrorIndicator description={errorDescription} /> : null}
          <Header searchMovie={this.handlerSearchMovie} />
          <div className="content">{isLoading ? <Spin size="large" /> : <Movies movies={movies} />}</div>
          <Footer />
        </Online>
        <Offline>
          <WarningIndicator />
          <div className="content">{isLoading ? <Spin size="large" /> : <Movies movies={movies} />}</div>
        </Offline>
      </div>
    );
  }
}
