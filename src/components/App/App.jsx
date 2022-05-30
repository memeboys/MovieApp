import { Spin, Tabs } from 'antd';
import React from 'react';
import { Offline } from 'react-detect-offline';
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
      guestSessionId: null,
      isLoading: true,
    };
    this.baseURL = 'https://api.themoviedb.org/3';
    this.apiKey = 'ca57099477a2c0925544b12050bcc9d6';
    this.handleMovieRate = this.handleMovieRate.bind(this);
  }

  async componentDidMount() {
    await Promise.all([this.startGuestSession(), this.fetchGenres()]);
    this.setState({ isLoading: false });
  }

  async startGuestSession() {
    const guestUrl = `${this.baseURL}/authentication/guest_session/new?api_key=${this.apiKey}`;
    const response = await fetch(guestUrl);
    if (!response.ok) {
      this.setState({ error: response.status });
      throw new Error(`Failed to load genre list with status: ${response.status}`);
    }
    const guestSession = await response.json();
    this.setState({ guestSessionId: guestSession.guest_session_id });
  }

  async fetchGenres() {
    const genresUrl = `${this.baseURL}/genre/movie/list?api_key=${this.apiKey}`;
    const response = await fetch(genresUrl);
    if (!response.ok) {
      this.setState({ error: response.status });
      throw new Error(`Failed to load genre list with status: ${response.status}`);
    }
    const genres = await response.json();
    this.setState({ genresList: genres.genres });
  }

  async handleMovieRate(movie, rate) {
    this.setState({
      userRates: { ...this.state.userRates, [movie.id]: rate },
    });
    if (rate > 0) {
      const url = new URL(`
      ${this.baseURL}/movie/${movie.id}/rating?api_key=${this.apiKey}&guest_session_id=${this.state.guestSessionId}`);
      const body = {
        value: rate,
      };
      const headers = {
        'Content-Type': 'application/json;charset=utf-8',
      };
      return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers,
      }).catch((e) => {
        this.setState({ error: e.message });
      });
    }
    if (rate === 0) {
      const url = new URL(`
      ${this.baseURL}/movie/${movie.id}/rating?api_key=${this.apiKey}&guest_session_id=${this.state.guestSessionId}`);
      return await fetch(url, {
        method: 'DELETE',
      }).catch((e) => {
        this.setState({ error: e.message });
      });
    }
  }

  render() {
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
                <RatedPage
                  guestSessionId={this.state.guestSessionId}
                  userRates={this.state.userRates}
                  onMovieRate={this.handleMovieRate}
                />
              </Tabs.TabPane>
            </Tabs>
          </div>
        )}
      </GenresContext.Provider>
    );
  }
}
