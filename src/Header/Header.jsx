import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="header_pagination pagination">
          <button className="pagination-btn-1 pagination__item pagination__item--active">Search</button>
          <button className="pagination-btn-2 pagination__item ">Rated</button>
        </div>
        <SearchForm />
      </header>
    );
  }
}
