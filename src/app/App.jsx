import React from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Spin } from 'antd';
import Movies from '../Movies/Movies';
import './App.css';
import '../Movies/Movies.css';
import '../Movie/Movie.css';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import WarningIndicator from '../WarningIndicator/WarningIndicator';

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
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/trending/movie/week?api_key=ca57099477a2c0925544b12050bcc9d6'
      );
      if (!response.ok) {
        const messageError = 'Error with Status code: ' + response.status;
        this.setState({ error: true, errorDescription: messageError });
        throw new Error(messageError);
      }
      let movie = await response.json();
      this.setState({ data: movie.results, isLoading: false });
      if (movie.length === 0 || movie === []) {
        const messageError = 'JSON FORMAT ERROR';
        this.setState({ error: true, errorDescription: messageError });
        throw new Error(messageError);
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { data, error, errorDescription, isLoading } = this.state;
    console.log('render');
    return (
      <div className="container">
        <Online>
          {error ? <ErrorIndicator description={errorDescription} /> : null}
          <div className="content">{isLoading ? <Spin size="large" /> : <Movies movies={data} />}</div>
        </Online>
        <Offline>
          <WarningIndicator />
        </Offline>
      </div>
    );
  }
}
