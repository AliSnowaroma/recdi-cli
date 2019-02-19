import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import RenderRouteItem from './RenderRouteItem'
import { mergePath } from './utils'

const CreateRouteContainer = ({indexPath, noMatchPath = '/'}) => {
  return ({routes, path}) => (
    <Switch>
      {
        routes.map( (route, i) => {
          return <RenderRouteItem {...route} route = {route} key = {i} path = {mergePath(path, route.path)}></RenderRouteItem>
        })
      }
      {
        /*这里是渲染整个Switch结构对应的路由*/
        indexPath ? <RenderRouteItem path = {path} exact redirect = {mergePath(path, indexPath)}></RenderRouteItem> : null
      }
      <RenderRouteItem path = {path} redirect = {mergePath(path,noMatchPath)}></RenderRouteItem>
    </Switch>
  )
}

export default CreateRouteContainer;
