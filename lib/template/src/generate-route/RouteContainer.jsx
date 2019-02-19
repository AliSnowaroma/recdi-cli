import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import RenderRouteItem from './RenderRouteItem'
import { mergePath } from './utils';

/**@params
 *routes 子路由数组 必填
 *path 当前模块对应的路由 该模块下也可以嵌套Switch结构 必填
 *indexpath 当前Switch结构对应首页的路由
 *noMatchPath 没有匹配路径时，跳转到的路径
**/
export default ({routes, path, indexPath, noMatchPath}) => {
  return <Switch>
    {
      routes.map((route, i) => {
        return <RenderRouteItem
          key = {i}
          {...route}
          parentPath = {path}
          route = {route}
          path = {mergePath(path, route.path)}
        >
        </RenderRouteItem>
      })
    }
    {
      /*这里是渲染整个Switch结构对应的路由*/
      indexPath ? <RenderRouteItem path = {path} exact redirect = {mergePath(indexPath, path)}></RenderRouteItem> : null
    }
    {
      noMatchPath !== undefined ? <RenderRouteItem path = {path} redirect = {mergePath(path,noMatchPath)}></RenderRouteItem> : null
    }
  </Switch>
}


