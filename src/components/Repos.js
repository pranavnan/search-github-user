import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import GithubContext from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";

const Repos = () => {
  const { repos } = useContext(GithubContext);

  const languages = repos.reduce((acc, curr) => {
    const { language, stargazers_count } = curr;

    if (!language) {
      return acc;
    }

    // JavaScript: {label: "JavaScript"  value: 45}
    // HTML: {label: "HTML"  value: 14}
    // CSS: {label: "CSS"  value: 38}

    if (!acc[language]) {
      acc[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      acc[language] = {
        label: language,
        value: acc[language].value + 1,
        stars: acc[language].stars + stargazers_count,
      };
    }

    return acc;
  }, {});

  // chartData = Object.values(languages) used to convert
  // JavaScript: { label: "JavaScript"  value: 45 }
  //  above type of Object into array [{ label: "JavaScript"  value: 45 },{}]

  const mostUsedLanguage = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Most Stars per Language
  const mostStarred = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .map((curr) => {
      return { label: curr.label, value: curr.stars };
    })
    .slice(0, 8);

  // stars, forks
  let { stars, forks } = repos.reduce(
    (acc, curr) => {
      const { stargazers_count, name, forks } = curr;

      acc.stars[stargazers_count] = { label: name, value: stargazers_count };

      acc.forks[forks] = { label: name, value: forks };

      return acc;
    },
    {
      stars: {},
      forks: {},
    }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();
  // slice(-5) gives us last 5 repos with most popular reops
  // reverse() because its ascending we want most popular repo in first position

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsedLanguage} />
        <Column3D data={stars} />
        <Doughnut2D data={mostStarred} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;

// import React from "react";
// import { useContext } from "react";
// import styled from "styled-components";
// import GithubContext from "../context/context";
// import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";

// const Repos = () => {
//   const { repos } = useContext(GithubContext);

//   let languages = repos.reduce((acc, curr) => {
//     const { language, stargazers_count } = curr;

//     if (!language) {
//       return acc;
//     }

//     if (!acc[language]) {
//       acc[language] = 1;
//     } else {
//       acc[language] += 1;
//     }

//     // JavaScript: {label: "JavaScript"  value: 45}
//     // HTML: {label: "HTML"  value: 14}
//     // CSS: {label: "CSS"  value: 38}

//     // if (!acc[language]) {
//     //   acc[language] = { label: language, value: 1 };
//     // } else {
//     //   acc[language] = { label: language, value: acc[language].value + 1 };
//     // }

//     return acc;
//   }, {});

//   let chartData = [];

//   // chartData = Object.values(languages) used to convert
//   // JavaScript: { label: "JavaScript"  value: 45 }
//   //  above type of Object into array [{ label: "JavaScript"  value: 45 },{}]

//   for (const key in languages) {
//     chartData.push({ label: key, value: languages[key] });
//   }

//   // We sort language popularity bi decending order and take only 5 top languages to show them in PIE#D chart

//   chartData = chartData.sort((a, b) => b.value - a.value).slice(0, 5);

//   return (
//     <section className="section">
//       <Wrapper className="section-center">
//         {/* <ExampleChart data={chartData} /> */}
//         <Pie3D data={chartData} />
//         {/* <div></div> */}
//         <Doughnut2D data={chartData} />
//         {/* <div></div> */}
//       </Wrapper>
//     </section>
//   );
// };

// const Wrapper = styled.div`
//   display: grid;
//   justify-items: center;
//   gap: 2rem;
//   @media (min-width: 800px) {
//     grid-template-columns: 1fr 1fr;
//   }

//   @media (min-width: 1200px) {
//     grid-template-columns: 2fr 3fr;
//   }

//   div {
//     width: 100% !important;
//   }
//   .fusioncharts-container {
//     width: 100% !important;
//   }
//   svg {
//     width: 100% !important;
//     border-radius: var(--radius) !important;
//   }
// `;

// export default Repos;
