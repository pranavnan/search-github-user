import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components/index";
// import loadingImage from "../images/preloader.gif";
import newLoadingSpinner from "../images/transparent-spinner.gif";
import GithubContext from "../context/context";
import { useContext } from "react";
import { useState } from "react";

const Dashboard = () => {
  const { isLoading } = useContext(GithubContext);

  return (
    <main>
      <Navbar />
      <Search />
      {isLoading && (
        <img
          src={newLoadingSpinner}
          className="loading-img"
          alt="loading image"
        />
      )}
      {!isLoading && (
        <>
          <Info />
          <User />
          <Repos />
        </>
      )}
    </main>
  );
};

export default Dashboard;
