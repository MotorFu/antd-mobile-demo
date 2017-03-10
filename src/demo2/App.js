import React, {Component} from 'react';
import {
  Button, DatePicker,
  List, NavBar,
  WhiteSpace,WingBlank,Card,
} from 'antd-mobile';
class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {history}=this.props;
    return (
        <div className="App">
          <NavBar mode="light" iconName={false}>第一界面</NavBar>
          <WhiteSpace size="lg"/>
          <List>
            <List.Item arrow="horizontal"
                       onClick={() => history.push("/next")}>
              <span style={{color: "green"}}>按钮A</span>
            </List.Item>
          </List>
          <WhiteSpace size="lg"/>
          <List.Item arrow="horizontal"
                     onClick={() => history.push("/next")}>
            <span style={{color: "green"}}>按钮B</span>
          </List.Item>

          <WhiteSpace size="lg"/>

          <DatePicker mode="date">
            <List.Item arrow="horizontal">日期</List.Item>
          </DatePicker>
        </div>
    );
  }
}

export default App;
