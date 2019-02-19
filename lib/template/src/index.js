import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import MainLayout from '@/layouts/MainLayout'//入口文件不能使用解构，否则热更新无效

import './index.scss'

const container = document.getElementById('app');

// ReactDOM.render(
//   <MainLayout></MainLayout>,
//   container
// )

const Render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component></Component>
    </AppContainer>,
    container
  )
}

Render(MainLayout);

if(module.hot){
  module.hot.accept('./layouts/MainLayout.jsx', () => {
    const NextApp = require('./layouts/MainLayout.jsx').default;
    Render(NextApp)
  })
}

