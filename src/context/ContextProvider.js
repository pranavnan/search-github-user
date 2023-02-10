import axios from "axios";
import { useEffect, useState } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import GithubContext from "./context";

function ContextProvider(props) {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // error
  const [error, setError] = useState({ show: false, msg: "" });
  const [isAuthenticated, setIsAuthenticated] = useState();

  function login() {
    // console.log("login");
    setIsAuthenticated(true);
  }

  function logout() {
    // console.log("logout");
    setIsAuthenticated(false);
  }

  const searchUser = async function (user) {
    toggleError();
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (response.ok) {
        const responseData = await response.json();
        setGithubUser(responseData);
        const { login, followers_url } = responseData;

        const responseFollowersRepos = await Promise.allSettled([
          fetch(`https://api.github.com/users/${login}/repos?per_page=100`),
          fetch(`${followers_url}?per_page=100`),
        ]);
        // console.log("first", responseFollowersRepos);

        const [repos, followers] = responseFollowersRepos;

        if (repos.status === "fulfilled") {
          const reposData = await repos.value.json();
          // console.log(reposData);
          setRepos(reposData);
        } else {
          throw new Error("Something went wrong");
        }

        if (followers.status === "fulfilled") {
          const followersData = await followers.value.json();
          // console.log(followersData);
          setFollowers(followersData);
        } else {
          throw new Error("Something went wrong");
        }
      } else {
        throw new Error("there is no user with that username");
      }
    } catch (e) {
      toggleError(true, e.message);
    }
    checkRequests();
    setIsLoading(false);
  };

  //  check rate
  const checkRequests = () => {
    axios(`https://api.github.com/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "sorry, you have exceeded your hourly rate limit!");
        }
      })
      .catch((err) => console.log(err));
  };
  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }
  // error
  useEffect(checkRequests, []);
  // get initial user

  // useEffect(() => {
  //   searchUser("google");
  // }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchUser,
        isLoading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
}

export default ContextProvider;
// user data request data
/*
{
  "login": "google",
  "id": 1342004,
  "node_id": "MDEyOk9yZ2FuaXphdGlvbjEzNDIwMDQ=",
  "avatar_url": "https://avatars.githubusercontent.com/u/1342004?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/google",
  "html_url": "https://github.com/google",
  "followers_url": "https://api.github.com/users/google/followers",
  "following_url": "https://api.github.com/users/google/following{/other_user}",
  "gists_url": "https://api.github.com/users/google/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/google/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/google/subscriptions",
  "organizations_url": "https://api.github.com/users/google/orgs",
  "repos_url": "https://api.github.com/users/google/repos",
  "events_url": "https://api.github.com/users/google/events{/privacy}",
  "received_events_url": "https://api.github.com/users/google/received_events",
  "type": "Organization",
  "site_admin": false,
  "name": "Google",
  "company": null,
  "blog": "https://opensource.google/",
  "location": null,
  "email": "opensource@google.com",
  "hireable": null,
  "bio": "Google ❤️ Open Source",
  "twitter_username": "GoogleOSS",
  "public_repos": 2425,
  "public_gists": 0,
  "followers": 17612,
  "following": 0,
  "created_at": "2012-01-18T01:30:18Z",
  "updated_at": "2021-12-30T01:40:20Z"
}*/

// import React from "react";
// import GithubContext from "./context";
// import mockUser from "./mockData.js/mockUser";
// import mockRepos from "./mockData.js/mockRepos";
// import mockFollowers from "./mockData.js/mockFollowers";
// import axios from "axios";
// import { useState } from "react";
// import { useEffect } from "react";

// const rootUrl = "https://api.github.com";

// function ContextProvider(props) {
//   const [githubUser, setGithubUser] = useState(mockUser);
//   const [repos, setRepos] = useState(mockRepos);
//   const [followers, setFollowers] = useState(mockFollowers);
//   // request loading
//   const [requests, setRequests] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   // check request
//   // error

//   const [error, setError] = useState({ show: false, msg: "" });

//   useEffect(() => {
//     async function getRequestLimit() {
//       setIsLoading(true);
//       const response = await fetch(`${rootUrl}/rate_limit`);
//       const data = await response.json();
//       // console.log(data.rate.remaining);
//       let {
//         rate: { remaining },
//       } = data;

//       // remaining = 0;

//       setRequests(remaining);

//       if (remaining === 0) {
//         // throw an error.
//         throw new Error("sorry, you have exceeded your hourly request limit");
//       }
//     }
//     getRequestLimit().catch((err) => toggleError(true, err.message));
//     setIsLoading(false);
//   }, [githubUser]);

//   function toggleError(show = false, msg = "") {
//     setError({ show, msg });
//   }

//   async function searchUser(user) {
//     // If we throw an error early then when searching new github user we wanna first remove that error
//     toggleError();
//     try {
//       const response = await fetch(`${rootUrl}/users/${user}`);
//       if (!response.ok) {
//         throw new Error(`no user found with username ${user}`);
//       }
//       const data = await response.json();
//       console.log(data);
//       setGithubUser(data);
//     } catch (e) {
//       toggleError(true, e.message);
//     }
//   }

//   const initialState = {
//     githubUser,
//     repos,
//     followers,
//     requests,
//     error,
//     searchUser,
//     isLoading,
//   };

//   return (
//     <GithubContext.Provider value={initialState}>
//       {props.children}
//     </GithubContext.Provider>
//   );
// }

// export default ContextProvider;
