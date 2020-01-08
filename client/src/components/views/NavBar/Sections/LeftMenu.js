import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="Home">
        <a href="/">홈</a>
      </Menu.Item>
      <Menu.Item key="Hot">
        <a href="/Hot">인기</a>
      </Menu.Item>
      <Menu.Item key="Subscription">
        <a href="/subscription">구독</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu