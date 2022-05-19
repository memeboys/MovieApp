import React from 'react';
import './SearchForm.css';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.onInputClick = this.onInputClick.bind(this);
  }
  onInputClick(e) {
    const inputText = e.target.value;
    this.setState({ value: inputText });
  }

  render() {
    return (
      <input
        className="header__search"
        placeholder="Type to search..."
        onInputClick={this.onInputClick}
        text={this.state.value}
      ></input>
    );
  }
}
