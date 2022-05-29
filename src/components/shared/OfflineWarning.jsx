import { Alert } from 'antd';
import React from 'react';

export default class OfflineWarning extends React.Component {
  render() {
    return (
      <Alert
        message="It looks like you have slow internet, please check your network settings or try again later"
        type="warning"
        showIcon
      />
    );
  }
}
