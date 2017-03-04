import React, {Component} from 'react';

import {Button, DatePicker, List} from 'antd-mobile';
import App from './App';

class Base extends Component {
  render() {
    const {History}=this.props;
    return (this.props.children != null ? this.props.children : <App {...this.props} />);
  }
}

export default Base;
