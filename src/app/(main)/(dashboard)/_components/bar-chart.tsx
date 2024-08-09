import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface BarChartProps {
  series: { name: string; data: number[] }[]; // Array of series data
  categories: string[]; // Categories for the x-axis (e.g., statuses)
}

const BarChart: React.FC<BarChartProps> = ({ series, categories }) => {
  const barChartData = {
    series: series,
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: categories,
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={barChartData.options as any}
        series={barChartData.series}
        type="bar"
        height={220}
        width={"100%"}      />
    </div>
  );
};

export default BarChart;
