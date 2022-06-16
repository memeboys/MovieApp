import { Spin, Tabs } from 'antd';
import React from 'react';
import { Offline } from 'react-detect-offline';
import { startGuestSession, fetchGenres, rateMovie } from '../../api/apiService';
import RatedPage from '../RatedPage/RatedPage';
import SearchPage from '../SearchPage/SearchPage';
import ErrorIndicator from '../shared/ErrorIndicator';
import { GenresContext } from '../shared/Genres';
import OfflineWarning from '../shared/OfflineWarning';
import './App.css';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genresList: [],
      userRates: {},
      isLoading: true,
      guestSessionId: localStorage.getItem('guestSessionId'),
    };
    this.handleMovieRate = this.handleMovieRate.bind(this);
  }

  async componentDidMount() {
    await this.fetchMovies();
    this.setState({ isLoading: false });
  }
  async fetchMovies() {
    try {
      const guestSessionId = await startGuestSession();
      this.setState({ guestSessionId: guestSessionId });
      const genres = await fetchGenres();
      this.setState({ genresList: genres.genres });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async handleMovieRate(movie, rate) {
    this.setState({
      userRates: { ...this.state.userRates, [movie.id]: rate },
    });
    await rateMovie(movie, rate, this.state.guestSessionId);
    localStorage.setItem(movie.id, rate);
  }

  render() {
    console.log(this.state.userRates);
    return (
      <GenresContext.Provider value={this.state.genresList}>
        <Offline>
          <OfflineWarning />
        </Offline>
        {this.state.isLoading ? (
          <Spin size="large" />
        ) : (
          <div className="container">
            {this.state.error ? <ErrorIndicator description={this.state.error} /> : null}
            <Tabs centered={true} destroyInactiveTabPane={true}>
              <Tabs.TabPane tab="Search" key="search">
                <SearchPage onMovieRate={this.handleMovieRate} userRates={this.state.userRates} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Rated" key="rated">
                <RatedPage guestSessionId={this.state.guestSessionId} />
              </Tabs.TabPane>
            </Tabs>
          </div>
        )}
      </GenresContext.Provider>
    );
  }
}
