import React, { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "./hooks";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";

interface Props {
  teamsArray: string[];
  teamRecords: { [key: string]: { wins: number } };
}

interface ChartData {
  name: string;
  color: string;
  y: number;
}

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

const NbaChart = (props: Props) => {
  const { teamsArray, teamRecords } = props;
  const [options, setOptions] = useState<Highcharts.Options>({});
  const teamInfoFromRedux = useAppSelector(
    (state) => state.teamInfo.teamInfo[0]
  );
  useEffect(() => {
    const chartData = teamsArray.map((team) => ({
      name: team,
      color: teamInfoFromRedux[team]?.color,
      y: teamRecords[team]?.wins || 0,
    }));
    console.log("chartdata", chartData);
    const options: Highcharts.Options = {
      chart: {
        type: "bar",
      },
      title: {
        text: "NBA Team Records",
      },
      xAxis: {
        categories: teamsArray,
      },
      yAxis: {
        title: {
          text: "Wins",
        },
      },
      series: [
        {
          type: "bar",
          name: "Wins",
          data: chartData,
        },
      ],
    };

    Highcharts.setOptions({
      colors: chartData.map((team) => team.color),
    });

    setOptions(options);
  }, []);

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  return (
    <div>
      nbaChart
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
        {...props}
      />
    </div>
  );
};

export default NbaChart;
