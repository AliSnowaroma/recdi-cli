import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import createRoutes from '@/routes'
import { RouteContainer } from '@/generate-route'
import { NotFound } from '@/components'

class MainLayout extends Component {
  render() {
    const { path, routes } = createRoutes();
    console.log(path, routes)
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <RouteContainer
              path = {path}
              routes = {routes}
              noMatchPath = "/mypage"
            >
            </RouteContainer>
            <Route path='/notfound' component={NotFound}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default MainLayout;



