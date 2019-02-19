import React, { Component } from 'react';
import { Link} from 'react-router-dom'


class MyPage extends Component {
  render() {
    return (
      <div>
        我的页面
        <Link to="/mypage/list">列表</Link>
        <Link to="/mypage/detail">详情</Link>
      </div>
    );
  }
}

export default MyPage;
