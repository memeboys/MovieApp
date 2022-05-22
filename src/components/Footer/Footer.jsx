import React from 'react';
import { Pagination } from 'antd';
import './Footer.css';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      current: e,
    });
    this.props.paginationPage(e, this.props.value);
  }
  render() {
    return (
      <Pagination
        className="footer"
        current={this.props.page > 1 ? this.state.current : this.props.page}
        onChange={this.onChange}
        total={50}
      />
    );
  }
}
