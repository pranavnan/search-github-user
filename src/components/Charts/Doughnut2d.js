import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export default function Pie3D({ data }) {
  const chartConfigs = {
    type: "doughnut3d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Stars Per Language",
        theme: "fusion",
        decimals: 0,
        showPercentValues: 0,
        pieRadius: "45%",
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
}

// import FusionCharts from "fusioncharts";
// import charts from "fusioncharts/fusioncharts.charts";
// import ReactFusioncharts from "react-fusioncharts";

// // Resolves charts dependancy
// charts(FusionCharts);

// function Doughnut2d({ data }) {
//   // if we want actual of stars of that repos use show property on chart obj
//   const dataSource = {
//     chart: {
//       caption: "Stars Per Language",
//       decimal: 0,
//       doughnutRadius: "35%",
//       theme: "candy",
//       showPercentValues: 0,
//     },
//     data,
//   };

//   return (
//     <ReactFusioncharts
//       type="doughnut3d"
//       width="100%"
//       height="100%"
//       dataFormat="JSON"
//       dataSource={dataSource}
//     />
//   );
// }

// export default Doughnut2d;
