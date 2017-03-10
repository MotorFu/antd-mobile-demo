import React, {Component} from 'react';
import {
  Button, DatePicker,
  List, NavBar, WhiteSpace,WingBlank
} from 'antd-mobile';
class Next extends Component {
  onClickA = (content) => {
    alert(content);
  }
  onClickB = (e, content) => {
    e.preventDefault();
    alert(content);
  }

  render() {
    const {history}=this.props;
    return (
        <div style={{minHeight:480}}>
          <NavBar mode="light" onLeftClick={()=>history.push("/")}>第二界面</NavBar>
          <WhiteSpace size="lg"/>
          <List>
            <List.Item arrow="horizontal"
                       onClick={() => this.onClickA("触发了第二界面的【List.Item】按钮")}>
              <span style={{color: "red"}}>List.Item</span>
            </List.Item>
          </List>

          <WhiteSpace size="lg"/>
          <Button onClick={(e) => this.onClickB(e, "触发了第二界面的【Button】按钮")}>
            <span style={{color: "red"}}>Button</span>
          </Button>

          <WhiteSpace size="lg"/>
          <div style={{backgroundColor:"#FFF",paddingLeft:15,height:42,lineHeight:"42px"}}
               onClick={(e) => this.onClickB(e, "触发了第二界面的【Div】按钮")}>
            <span style={{color: "red"}}>Div</span>
          </div>

        </div>
    );
  }
}

export default Next;
