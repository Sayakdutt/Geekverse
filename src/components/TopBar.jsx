import React from "react";
import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const TopBar = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const { dispatch } = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";

    dispatch(SetTheme(themeValue));
  };

  const handleSearch = async (data) => {};
  const handleMoveToLogin = () => {
    navigate("/login");
  };
  return (
    //  Bidipta
    // <Nav className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary">
    //   <Link to="/" className="flex gap-2 items-center">
    //     <div className="p-1 md:p-2 bg-[#065ad8] rounded text-white">
    //       <TbSocial />
    //     </div>
    //     <span className="text-xl md:text-2xl text-[#065ad8] font-semibold">
    //       Sharefun
    //     </span>
    //   </Link>

    //   <form
    //     className="hidden md:flex items-center justify-center"
    //     onSubmit={handleSubmit(handleSearch)}
    //   >
    //     <TextInput
    //       placeholder="Search..."
    //       styles="w-[18rem] lg:w-[38rem] rounded-l-full py-3"
    //       register={register("search")}
    //     />

    //     <CustomButton
    //       Title="Search"
    //       type="submit"
    //       containerStyles="bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full"
    //     />
    //   </form>

    //   {/*ICONS */}

    //   <div className="flex gap-4 iteems-center text-ascent-1 text-md md:text-xl">
    //     <button onClick={() => handleTheme()}>
    //       {theme ? <BsMoon /> : <BsSunFill />}
    //     </button>
    //     <div className="hidden lg:flex">
    //       <IoMdNotificationsOutline />
    //     </div>

    //     <div>
    //       <CustomButton
    //         onClick={() => dispatch(Logout())}
    //         title="Logout"
    //         containerStyles="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
    //       />
    //     </div>
    //   </div>
    // </Nav>
    <Nav>
      <Logo>
        <img src="logo.svg" />
        <p>Geekverse</p>
      </Logo>
      <span className="text-white ml-5">Geekverse</span>
      <NavMenu>
        <a href="/home">
          <img src="Group.svg" alt="Home" />
          <span>Home</span>
        </a>
        <a href="">
          <img src="explore-empty.svg" alt="Home" />
          <span>Explore</span>
        </a>
        <a href="">
          <img src="notifications-empty.svg" alt="Home" />
          <span>Notifications</span>
        </a>
        <a href="">
          <img src="messages-empty.svg" alt="Home" />
          <span>Messages</span>
        </a>
        <a href="">
          <img src="bookmarks-empty.svg" alt="Home" />
          <span>Bookmarks</span>
        </a>
        <a href="">
          <img src="lists-empty.svg" alt="Home" />
          <span>Lists</span>
        </a>
        <a href="">
          <img src="search.svg" alt="Search" />
          <span>Search</span>
        </a>
        {/* <a href="">
          <img src="more.svg" alt="Home" />
          <span>More</span>
        </a> */}
      </NavMenu>
      <SignOut>
        <UserImg src="more.svg" alt="more" />
        <DropDown>
          <span onClick={handleMoveToLogin} className="text-white">
            Sign out
          </span>
        </DropDown>
      </SignOut>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgb(19, 4, 20);
  background: linear-gradient(0deg, rgb(20, 4, 20) 0%, rgba(0, 0, 0, 1) 100%);
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 5px;
  span {
    font-size: 20px;
    font-weight: 500;
  }
  z-index: 30000000000;
`;
const Logo = styled.a`
  padding: 0;
  width: 40px;
  margin-top: 4px;
  max-height: 40px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;
const NavMenu = styled.div`
  background: rgb(19, 4, 20);
  background: linear-gradient(0deg, rgb(20, 4, 20) 0%, rgba(0, 0, 0, 1) 100%);
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  margin: 0px;
  /* margin-right: auto; */
  margin-left: auto;
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
      font-size: 15px;
      margin-left: 10px;
      letter-spacing: 2px;
      line-height: 1.08;
      padding: 2px, 0px;
      white-space: nowrap;
      position: relative;
      font-weight: 400;

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
        color: #9a00c9;
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
  border-radius: 20px;
  box-shadow: rgb(0 0 0/ 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 1.5px;
  width: 15vw;
  opacity: 0;
`;
const SignOut = styled.div`
  position: relative;
  height: 30px;
  width: 30px;
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
export default TopBar;
