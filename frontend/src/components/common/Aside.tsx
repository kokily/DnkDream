import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import oc from 'open-color';
import { media, shadow } from 'styles';

export interface UserResponse {
  id: string;
  username: string;
  admin: string;
  createdAt: string;
  updatedAt?: string;
}

interface AsideProps {
  user: UserResponse | null;
  toggle: boolean;
  onBrand: () => void;
  onToggle: () => void;
  onWrite: () => void;
  onLogout: () => void;
}

const Aside: React.FC<AsideProps> = ({
  user,
  toggle,
  onBrand,
  onToggle,
  onWrite,
  onLogout,
}) => {
  return (
    <header>
      <AsideContainer className={toggle === true ? 'active' : ''}>
        <BrandLogo onClick={onBrand}>
          <span className="title">D&K Dream</span>
          <span className="myName">by... KOKILY</span>
        </BrandLogo>

        <Toggle onClick={onToggle}>
          <i className="fa fa-bars"></i>
        </Toggle>

        <ul>
          <li>
            <Menu exact to="/" activeClassName="active">
              <i className="fa fa-newspaper-o"></i> 포스트
            </Menu>
          </li>
          <li>
            <Menu to="/intro" activeClassName="active">
              <i className="fa fa-github-alt"></i> 소개글
            </Menu>
          </li>

          {user && (
            <>
              <li>
                <Button onClick={onWrite}>
                  <i className="fa fa-pencil-square-o"></i> 글 작성
                </Button>
              </li>
              <li>
                <Button onClick={onLogout}>
                  <i className="fa fa-share-square-o"></i> 로그아웃
                </Button>
              </li>
            </>
          )}
        </ul>
      </AsideContainer>
    </header>
  );
};

export default Aside;

// Styling
const AsideContainer = styled.div`
  height: 100%;
  min-height: 400px;
  width: 0px;
  background: ${oc.cyan[5]};
  color: ${oc.gray[0]};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  ${shadow(3)};
  ul {
    min-width: 200px;
    list-style: none;
    li {
      margin-bottom: 10px;
    }
  }
  &.active {
    z-index: 10;
    width: 200px;
  }
  ${media.tablet} {
    z-index: 10;
    width: 200px;
    &.active {
      width: 0px;
    }
  }
`;

const BrandLogo = styled.div`
  min-width: 200px;
  padding: 50px 20px;
  box-sizing: border-box;
  text-align: right;
  cursor: pointer;
  transition: 0.3s ease all;
  span {
    display: block;
    &.title {
      font-size: 1.5rem;
      font-weight: 600;
    }
    &.myName {
      font-weight: 600;
      color: rgba(247, 247, 247, 0.6);
    }
  }
  &:hover {
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.7);
  }
`;

const Toggle = styled.button`
  display: none;
  position: fixed;
  z-index: 15;
  top: 20px;
  right: 20px;
  width: 38px;
  height: 38px;
  background: ${oc.gray[0]};
  border: none;
  padding: 0;
  ${shadow(2)};
  ${media.tablet} {
    display: block;
  }
`;

const Menu = styled(NavLink)`
  text-decoration: none;
  height: 42px;
  line-height: 42px;
  display: block;
  font-weight: bold;
  border-left: 3px solid transparent;
  padding: 0 0 0 24px;
  cursor: pointer;
  transition: 0.3s ease all;
  color: ${oc.indigo[9]};
  &.active {
    color: ${oc.gray[0]};
    border-left: 2px solid ${oc.indigo[9]};
  }
  .fa {
    margin-right: 20px;
  }
  &:hover,
  &:focus {
    color: ${oc.gray[0]};
    outline: none;
  }
`;

const Button = styled.div`
  text-decoration: none;
  height: 42px;
  line-height: 42px;
  display: block;
  font-weight: bold;
  border-left: 3px solid transparent;
  padding: 0 0 0 24px;
  cursor: pointer;
  transition: 0.3s ease all;
  color: ${oc.indigo[9]};
  &.active {
    color: ${oc.gray[0]};
    border-left: 2px solid ${oc.indigo[9]};
  }
  .fa {
    margin-right: 20px;
  }
  &:hover,
  &:focus {
    color: ${oc.gray[0]};
    outline: none;
  }
`;
