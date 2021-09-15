import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "components/Logo";
import React from "react";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #001529;
  height: 80px;
  padding: 0 40px;
  color: #fff;
`;

const LeftWrapper = styled.section`
  display: flex;
  align-items: center;
  width: 600px;

  > ul {
    display: flex;
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

const Header: React.FC = () => {
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
  return (
    <HeaderWrapper>
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

      <RightWrapper>
        <ul>
          {loginList.map((item) => (
            <li>
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </RightWrapper>
    </HeaderWrapper>
  );
};

export default Header;
