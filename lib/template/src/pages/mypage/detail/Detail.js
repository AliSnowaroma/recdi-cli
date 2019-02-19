import React, { Component } from 'react';
import { RouteContainer } from '@/generate-route'
import { Switch, Redirect, Route } from 'react-router-dom'

class Detail extends Component {
  render() {
    const { path, routes } = this.props;
    console.log(path, routes)
    return (
      <div>
        <div style={{position:'fixed',top:'0',left:'0',height:'50px',width:'100%',textAlign:'center',background:'#ccc'}}>我的详情页面</div>
        <div style = {{float:'left',width:'180px',background:'#999',height:'100vh',paddingTop:'100px',boxSizing:'border-box'}}>左侧统一导航</div>
        <div>
          <Switch>
            <RouteContainer
              path = {path}
              routes = {routes}
              noMatchPath = "/manage"
            >
            </RouteContainer>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Detail;
