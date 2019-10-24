# db-cli 使用  
  
```js
tnpm install @ali/recdi-cli -g
recdi-cli init [appName]
npm install 
npm run dev 开发环境启动
npm run build 打包
```

# 项目结构：这里不再累述，典型react单页面结构  


# 分布式路由结构(基于react-router)  

## 核心思想  
>每个模块都有一个对应的路由路径，使用时把这些路径组合起来

## 路由结构  
* 1，所有的路由配置集成在routes文件夹，总的来说routes文件夹的结构和pages下文件夹的结构是相同的  
* 2，对应源码结构：generate-route  
  ```
  CreateRouteContainer --- 创建路由容器  
  RouteContainer --- 路由容器，生成路由结构  
  RenderRouteItem --- 渲染单个路由，如果路由路径对应的是路由容器，会再次调用该渲染 
  ``` 

## 使用方法：  
>创建模块时，创建对应的Route.js路由文件，在路由配置文件夹下引用该文件  
>例子：
  ### 建立一级路由：  
  >如一级路由/pagetest,对应模板中的PageTest.js模块  
  >在routes文件夹下index.js对应一级路由，把路由文件放进该文件中，一级路由配置完成  
  ```
  Route.routes = [PageTestRoute()].map(it => {
    it.parentPath = Route.path;
    return it;
  })
  ```
  ### 建立二级路由  
  >比如创建模板中mypage页面，mypage对应路径mypage,detail
  #### pages下模块创建：  
  * 1，创建mypage文件夹  
  * 2，mypage文件夹下创建list文件夹  
  * 3，list下创建List.js和Route.js  
  #### routes下创建路由配置  
  * 1，routes下创建mypage文件夹，并建立index.js路由配置文件，其下放置的是以/mypage开头路由的配置  
  * 2，mypage下创建list文件夹，list文件夹下创建index.js文件，其下放置的是以/list开头路由的配置  
  * 3，配置list下index.js路由配置文件：  
    ```js
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
    ```
    >注：CreateRouteContainer接收的两个参数：
    ```  
    indexPath代表的是路由/list后的首页，当访问/list时，会跳转到/list/indexPath，indexPath也可以不设置  
    indexPath设置为空时，此时配置mypage对应的Route，/mypage路由当前路由组对应的首页  
    noMatchPath是当/list后路径不存在时，跳转到的路径 
    ``` 
   * 4，配置mypage下的路由配置文件  
    ```js
    import listRoute from './list'
    import detailRoute from './detail'
    import NavRoute from '@/pages/mypage/nav/Route'
    import { CreateRouteContainer } from '@/generate-route'

    export default () => ({
      path:'/mypage',
      component:CreateRouteContainer({indexPath:'/nav',noMatchPath:'/list'}),
      strict:false,
      exact:false,
      routes:[
        listRoute(),
        detailRoute(),
        NavRoute()
      ]
    })
    ```
    >这里引入刚才设置的list路由配置文件，作为/mypage/list开头的路由  
    >上面设置了/mypage的默认首页路由/nav，默认跳转到/mypage/nav，如果不设置，则默认跳转到/mypage/list  
  #### 创建带有布局的模块组件  
    
  >比如上述mypage模块，不单纯是一个路由容器组件，也不单纯是一个页面组件，而是二者的结合，既要展示内容，又要充当容器，  
  >也就是说mypage模块的内容会在以/mypage路由开头的路径中展示，这时，需要在mypage组件中引用RouterContainer,和内容结合  
  ```
  RouteContainer接收4个参数：  
    * routes 子路由数组  
    * path 当前模块对应的路由 该模块下也可以嵌套Switch结构  
    * indexpath 当前Switch结构对应首页的路由  
    * noMatchPath 没有匹配路径时，跳转到的路径 
  ``` 
  >比如模板中Detail.js充当一个页面布局组件   
    
  ```js
   class Detail extends Component {
    render() {
      const { path, routes } = this.props;
      return (
        <div>
          <div style={{position:'fixed',top:'0',left:'0',height:'50px',width:'100%',textAlign:'center',background:'#ccc'}}>我的详情页面</div>
          <div style = {{float:'left',width:'180px',background:'#999',height:'100vh',paddingTop:'100px'}}>左侧统一导航</div>
          <div>
            <RouteContainer
              path = {path}
              routes = {routes}
              noMatchPath = "/manage"
            ></RouteContainer>
          </div>
        </div>
      );
    }
  }
  ```
  >配置detail路由：  

  ```js
  import ManageRoute from '@/pages/mypage/detail/ManageRoute'
  import Detail from '@/pages/mypage/detail/Detail'
  import { CreateRouteContainer } from '@/generate-route'

  export default () => ({
    path:'/detail',
    component:Detail,
    strict:false,
    exact:false,
    routes:[
      ManageRoute()
    ]
  })
  ```
  >此时/detail路由对应Detail模块  

  ### 设置页面布局  
  >像上面的带布局的组件可以提取为页面布局，放到layouts中，方便管理，布局创建方式同上





