import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface LineChartProps {
  series: { name: string; data: number[] }[]; // Array of series data
  categories: string[]; // Categories for the x-axis (e.g., months)
}

const LineChart: React.FC<LineChartProps> = ({ series, categories }) => {
  const lineChartData = {
    series: series,
    options: {
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        categories: categories,
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={lineChartData.options as any}
        series={lineChartData.series}
        type="line"
        height={220}
        width={"100%"}      />
    </div>
  );
};

export default LineChart;
