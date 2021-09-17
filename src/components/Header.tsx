import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import Logo from "components/Logo";
import Center from "components/Center";
import { Button } from "antd";
import { useStores } from "store";
import { observer } from "mobx-react-lite";

const HeaderWrapper = styled.div`
  background-color: #001529;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  color: #fff;
`;

const LeftWrapper = styled.section`
  display: flex;
  align-items: center;
  width: 600px;
  height: inherit;

  > ul {
    display: flex;
    height: inherit;
    align-items: center;
    margin-bottom: 0;
    font-size: 24px;

    > li {
      margin: 0 10px;

      > a {
        display: inline-block;
        padding: 8px 0;
      }

      > a.active {
        border-bottom: 1px solid #fff;
      }
    }
  }
`;

const RightWrapper = styled.section`
  > ul {
    display: flex;

    > li {
      background-color: #fff;
      margin: 0 6px;
      color: #333;

      a {
        display: inline-block;
        padding: 4px 6px;
      }
    }
  }
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
`;

const Header: React.FC = observer(() => {
  const linkList = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/user",
      name: "User",
    },
    {
      link: "/about",
      name: "About",
    },
  ];

  const loginList = [
    {
      link: "/login",
      name: "登录",
    },
    {
      link: "/register",
      name: "注册",
    },
  ];

  const history = useHistory();
  const { userStore, AuthStore } = useStores();

  const handleLogout = () => {
    AuthStore.logout();
  };

  const buttonList = (currentUser: any) => {
    if (currentUser) {
      // 已登录
      return (
        <div>
          <span>你好，{currentUser.attributes.username}</span>
          <StyledButton type="primary" size="small" onClick={handleLogout}>
            注销
          </StyledButton>
        </div>
      );
    } else {
      // 未登录
      return (
        <>
          {loginList.map((item) => (
            <StyledButton
              key={item.name}
              type="primary"
              onClick={() => history.push(item.link)}
            >
              {item.name}
            </StyledButton>
          ))}
        </>
      );
    }
  };

  return (
    <HeaderWrapper>
      <Center>
        <HeaderContainer>
          <LeftWrapper>
            <Logo />
            <ul>
              {linkList.map((linkItem) => {
                return (
                  <li key={linkItem.link}>
                    <NavLink to={linkItem.link} activeClassName="active" exact>
                      {linkItem.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </LeftWrapper>

          <RightWrapper>{buttonList(userStore.getCurrentUser)}</RightWrapper>
        </HeaderContainer>
      </Center>
    </HeaderWrapper>
  );
});

export default Header;
