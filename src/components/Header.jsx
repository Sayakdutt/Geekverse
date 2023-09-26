import React from "react";
import styled from "styled-components";
import { auth } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserEmail,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../../features/users/userSlice";
import { useEffect } from "react";

const Header = (props) => {
  // useDispatch() = for dispatching acitons to the store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useSelector(selectUserName) = for collecting information ( for e.g:selectUserName ) from the store
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userPhoto = useSelector(selectUserPhoto);
  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
      })
    );
  };
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });
  }, [userName]);
  const handleAuth = async () => {
    // console.log(auth);
    if (!userName) {
      const provider = await new GoogleAuthProvider();
      return signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          console.log("errormessage -> ", errorMessage);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
        })
        .catch((err) => {
          console.log("Error in logout", err);
        });
    } else {
      navigate("/");
    }
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" />
      </Logo>
      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" alt="Home" />
              <span>Home</span>
            </a>
            <a href="">
              <img src="/images/search-icon.svg" alt="Home" />
              <span>Search</span>
            </a>
            <a href="">
              <img src="/images/watchlist-icon.svg" alt="Home" />
              <span>Watchlist</span>
            </a>
            <a href="">
              <img src="/images/original-icon.svg" alt="Home" />
              <span>Originals</span>
            </a>
            <a href="">
              <img src="/images/movie-icon.svg" alt="Home" />
              <span>Movies</span>
            </a>
            <a href="">
              <img src="/images/series-icon.svg" alt="Home" />
              <span>Series</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgb(4, 7, 20);
  background: linear-gradient(
    0deg,
    rgba(4, 7, 20, 0.6280637254901961) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 30000000000;
`;
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;
const NavMenu = styled.div`
  background: rgb(4, 7, 20);
  background: linear-gradient(
    0deg,
    rgba(4, 7, 20, 0.6280637254901961) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin: 0px;
  margin-right: auto;
  margin-left: 25px;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      margin-left: 10px;
      letter-spacing: 2px;
      line-height: 1.08;
      padding: 2px, 0px;
      white-space: nowrap;
      position: relative;

      /* adding the line animaiton on hover */
      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        opacity: 0;
        position: absolute;
        right: 0px;
        left: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      cursor: pointer;
      span {
        color: #0483ee;
      }
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
  @media (max-width: 760px) {
    display: none;
  }
`;
const Login = styled.a`
  background-color: rgb(0, 0, 0, 0.6);
  padding: 8px 16px;
  /* transforms the text to uppercase */
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 2px solid #f9f9f9;
  border-radius: 10px;
  transition: all 0.2s ease 0s;
  &:hover {
    color: black;
    background-color: #f9f9f9;
    border-color: transparent;
    cursor: pointer;
  }
`;
const UserImg = styled.img`
  height: 100%;
`;
const DropDown = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(4, 7, 20);
  background: linear-gradient(
    0deg,
    rgba(4, 7, 20, 0.6280637254901961) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 5px;
  box-shadow: rgb(0 0 0/ 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 1.5px;
  width: 100px;
  opacity: 0;
`;
const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  /* UserImg variable is selected to add some more css */
  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;
export default Header;
