import PageTestRoute from '@/pages/pagetest/Route'
import mypageRoute from './mypage'

//给每个子路由加上parentPath
const createRoutes = () => {
  const Route = {
    path:'/'
  }
  Route.routes = [PageTestRoute(),mypageRoute()].map(it => {
    it.parentPath = Route.path;
    return it;
  })
  return Route
}

export default createRoutes;
