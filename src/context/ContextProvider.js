import React from "react";
import GithubContext from "./context";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import { useState } from "react";

const rootUrl = "https://api.github.com";

function ContextProvider(props) {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const initialState = {
    githubUser,
    repos,
    followers,
  };

  return (
    <GithubContext.Provider value={initialState}>
      {props.children}
    </GithubContext.Provider>
  );
}

export default ContextProvider;
