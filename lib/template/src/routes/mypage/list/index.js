import ListRoute from '@/pages/mypage/list/Route'
import { CreateRouteContainer } from '@/generate-route'

export default () => ({
  path:'/list',
  component:CreateRouteContainer({indexPath:'',noMatchPath:'/index'}),
  strict:false,
  exact:false,
  routes:[
    ListRoute()
  ]
})
