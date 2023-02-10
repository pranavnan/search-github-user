import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useContext } from "react";
import GithubContext from "../context/context";
import { useEffect } from "react";

const Navbar = () => {
  const {
    isAuthenticated,
    user,
    isLoading,
    loginWithRedirect,
    logout: logoutUser,
  } = useAuth0();

  // console.log({ isAuthenticated, user, isLoading });

  const isUser = isAuthenticated && user;

  const { login, logout } = useContext(GithubContext);

  useEffect(() => {
    if (isAuthenticated) {
      login();
    } else {
      logout();
    }
  }, [isAuthenticated]);

  function loginHandler() {
    loginWithRedirect();
  }

  function logoutHandler() {
    logoutUser();
  }

  //  user object info
  //   {
  //   "sub": "google-oauth2|114277113934011740811",
  //   "given_name": "Pranav",
  //   "family_name": "Nandane",
  //   "nickname": "pranavnan612",
  //   "name": "Pranav Nandane",
  //   "picture": "https://lh3.googleusercontent.com/a/AEdFTp6Fl7HeG_4FsjkAgcbl1Jnzyy0ThRhRykM5RBAgbg=s96-c",
  //   "locale": "en",
  //   "updated_at": "2023-02-10T09:16:07.521Z"
  // }

  return (
    <Wrapper>
      {isUser && <img src={user.picture} alt={user.name} />}
      {isUser && (
        <h4>
          Welcome, <strong>{user.name.toUpperCase()}</strong>
        </h4>
      )}
      {isUser ? (
        <button onClick={logoutHandler}>Logout</button>
      ) : (
        <div className="btn-text-icon">
          <span>Please, login first</span>
          <button className="login-button" onClick={loginHandler}>
            <div className="icon-text">
              <AiOutlineUserAdd style={{ fontSize: "1.5rem" }} />
              <span>Log In</span>
            </div>
          </button>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1rem 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .icon-text {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .btn-text-icon {
    display: flex;
    gap: 3rem;
    align-items: center;
  }
  .login-button {
    background-color: #e6e6ff;
    color: #5d55fa;
    padding: 0.4rem 0.8rem;
    border-radius: 10px;
    transition: all 0.3s;
  }
  .login-button:hover {
    background-color: #dfddfe;
  }
`;

export default Navbar;
