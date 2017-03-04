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
        <div style={{minHeight:480}}>
          <NavBar mode="light" iconName={false}>第一界面</NavBar>
          <WhiteSpace size="lg"/>
          <List>
            <List.Item arrow="horizontal"

                       onClick={() => history.push("/next")}>
              <span style={{color: "green"}}>List.Item 按钮A——出现异常</span>
            </List.Item>
          </List>
          <WhiteSpace size="lg"/>

          <Button onClick={() => history.push("/next")}>
            <span style={{color: "green"}}>Button 按钮B——出现异常</span>
          </Button>

          <WhiteSpace size="lg"/>
          <div style={{backgroundColor:"#FFF",paddingLeft:15,height:42,lineHeight:"42px"}}
               onClick={() => history.push("/next")}>
            <span style={{color: "green"}}>Div 按钮C——点击无异常</span>
          </div>

          <WingBlank size="lg">
            <WhiteSpace size="lg"/>
            <Card>
              <Card.Header title="在Android浏览器中出现onClick穿透"></Card.Header>
              <Card.Body>即在第一界面点击“按钮A”进入第二界面时，会触发第二界面相同位置上的“事件A”按钮.</Card.Body>
            </Card>
            <WhiteSpace size="lg"/>
          </WingBlank>
        </div>
    );
  }
}

export default App;
