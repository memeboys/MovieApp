import React from 'react';
import { Pagination } from 'antd';
import './Footer.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(page) {
    console.log(page);
    this.setState({
      current: page,
    });
  }
  render() {
    return <Pagination className="footer" current={this.state.current} onChange={this.onChange} total={50} />;
  }
}
