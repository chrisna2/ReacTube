import React from 'react';
import { Menu } from 'antd';
import { useSelector } from "react-redux";

function LeftMenu(props) {
  const user = useSelector(state => state.user)

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="Home">
          <a href="/">홈</a>
        </Menu.Item>
        <Menu.Item key="Hot">
          <a href="/Hot">인기</a>
        </Menu.Item>
      </Menu>
    )
  }
  else{
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
}

export default LeftMenu