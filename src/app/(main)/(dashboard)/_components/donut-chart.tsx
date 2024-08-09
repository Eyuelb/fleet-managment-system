import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface DonutChartProps {
  data: number[];  // Array of counts for each status
  labels: string[]; // Labels corresponding to the data
}

const DonutChart: React.FC<DonutChartProps> = ({ data, labels }) => {
  const donutChartData = {
    series: data,
    options: {
      chart: {
        type: 'donut',
      },
      labels: labels,
    },
  };

  return (
    <div>
      <ReactApexChart
        options={donutChartData.options as any}
        series={donutChartData.series}
        type="donut"
        height={220}
        width={"100%"}
      />
    </div>
  );
};

export default DonutChart;
