import listRoute from './list'
import detailRoute from './detail'
import NavRoute from '@/pages/mypage/nav/Route'
import MyPageRoute from '@/pages/mypage/Route'
import { CreateRouteContainer } from '@/generate-route'

export default () => ({
  path:'/mypage',
  component:CreateRouteContainer({indexPath:'',noMatchPath:'/list'}),
  //component:CreateRouteContainer({indexPath:'/nav',noMatchPath:'/list'}),默认首页为/mypage/nav
  strict:false,
  exact:false,
  routes:[
    listRoute(),
    detailRoute(),
    //NavRoute(),
    MyPageRoute()
  ]
})
