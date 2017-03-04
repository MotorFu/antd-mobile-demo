import React, {Component} from 'react';
import {
  Button, DatePicker,
  List, NavBar, WhiteSpace
} from 'antd-mobile';
class Next extends Component {
  onClick = (e, content) => {
    e.preventDefault();
    alert(content);
  }

  render() {
    const {history}=this.props;
    return (
        <div className="App">

          <NavBar mode="light" onLeftClick={history.goBack}>第二界面</NavBar>
          <WhiteSpace size="lg"/>
          <List>
            <List.Item arrow="horizontal"
                       onClick={(e) => this.onClick(e, "触发了第二界面的事件A按钮")}>
              <span style={{color: "red"}}>事件A</span>
            </List.Item>
          </List>
          <WhiteSpace size="lg"/>
          <List.Item arrow="horizontal"
                     onClick={(e) => this.onClick(e, "触发了第二界面的事件B按钮")}>
            <span style={{color: "red"}}>事件B</span>
          </List.Item>

        </div>
    );
  }
}

export default Next;
