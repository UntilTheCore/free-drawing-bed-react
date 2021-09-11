import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "components/Logo";
import React from "react";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #001529;
  height: 80px;
  padding: 0 40px;
`;

const LeftWrapper = styled.section`
  display: flex;
  align-items: center;
  width: 600px;

  > ul {
    display: flex;
    color: #fff;
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
  return (
    <HeaderWrapper>
      <LeftWrapper>
        <Logo />
        <ul>
          {linkList.map((linkItem) => {
            return (
              <li key={linkItem.link}>
                <Link to={linkItem.link} activeClassName="active" exact>
                  {linkItem.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </LeftWrapper>
    </HeaderWrapper>
  );
};

export default Header;
