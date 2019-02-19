import ManageRoute from '@/pages/mypage/detail/manage/Route'
import Detail from '@/pages/mypage/detail/Detail'
//import { CreateRouteContainer } from '@/generate-route'

export default () => ({
  path:'/detail',
  component:Detail,
  strict:false,
  exact:false,
  routes:[
    ManageRoute()
  ]
})
