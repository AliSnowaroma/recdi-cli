import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { mergePath } from './utils'

const RenderRouteItem = ({
  parentPath='/',
  path,
  redirect,
  routes,
  component:Component,
  route,
  strict,
  exact,
  computedMatch,
  ...rest
}) => {
  return redirect === undefined ?
    <Route
      render = { props => { /**这里的props指的是路由内置的props 这里是把相关属性下传*/
              /* 如果是createRouteContainer,这里相当于再次调用RouteContainer*/
              /**这里的routes是指当前createRouteContainer组件的子路由数组 */
        return <Component {...props} {...rest} parentPath = {parentPath} path = {path} route = {route} routes = {routes}></Component>
      }}
      path = {path}
      strict = {strict}
      exact = {exact}
    >
    </Route> :
    <Route
      render = {
        () => {
          return <Redirect to = {redirect}></Redirect>
        }
      }
      path = {path}
      exact = {exact}
      strict = {strict}
    >
    </Route>
}
RenderRouteItem.propTypes = {
  routes:PropTypes.array,
  parentPath:PropTypes.string,
  component:PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  strict:PropTypes.bool,
  exact:PropTypes.bool,
  path:PropTypes.string.isRequired,
  computedMatch:PropTypes.any,
  route:PropTypes.object,
  redirect:PropTypes.string

}
RenderRouteItem.contextTypes = {
  color: PropTypes.string
};
export default RenderRouteItem;
