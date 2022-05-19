import { Spin } from 'antd';
import React from 'react';
import { Offline, Online } from 'react-detect-offline';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import Header from '../Header/Header';
import '../Movie/Movie.css';
import Movies from '../Movies/Movies';
import '../Movies/Movies.css';
import WarningIndicator from '../WarningIndicator/WarningIndicator';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      error: false,
    };
  }

  async componentDidMount() {
    await this.presentTrendingMovies();
  }

  async presentTrendingMovies() {
    try {
      const movie = await this.fetchTrendingMovies();
      this.setState({ data: movie.results, isLoading: false });
    } catch (error) {
      this.setState({ error: true, errorDescription: error.message });
      console.error(error);
    }
  }

  async fetchTrendingMovies() {
    const response = await fetch(
      'https://api.themoviedb.org/3/trending/movie/week?api_key=ca57099477a2c0925544b12050bcc9d6'
    );
    if (!response.ok) {
      const messageError = 'Error with Status code: ' + response.status;
      throw new Error(messageError);
    }
    return response.json();
  }

  render() {
    const { data, error, errorDescription, isLoading } = this.state;
    return (
      <div className="container">
        <Online>
          {error ? <ErrorIndicator description={errorDescription} /> : null}
          <Header />
          <div className="content">{isLoading ? <Spin size="large" /> : <Movies movies={data} />}</div>
        </Online>
        <Offline>
          <WarningIndicator />
          <div className="content">{isLoading ? <Spin size="large" /> : <Movies movies={data} />}</div>
        </Offline>
      </div>
    );
  }
}
