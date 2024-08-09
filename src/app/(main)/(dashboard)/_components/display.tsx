"use client";
import React, { useEffect, useState, useMemo } from "react";
import LineChart from "./line-chart";
import DonutChart from "./donut-chart";
import BarChart from "./bar-chart";
import { Flex, Text } from "@mantine/core";
import { IconChartBar } from "@tabler/icons-react";
import { ThemeToggleButton } from "@components/common/theme-toggle-button";
import ChartContainer from "@components/chart-container";
import useQueryRequest from "@hooks/useQueryRequest";
import ReactApexChart from "react-apexcharts";
const processDonutChartData = (data: any) => {
  const statuses = ["Submitted", "Approved", "Rejected"];
  const counts = statuses.map((status) => {
    return (
      (data.fleetData?.find((item: any) => item.status === status)?.count ||
        0) +
      (data.maintenanceData?.find((item: any) => item.status === status)
        ?.count || 0) +
      (data.fuelData?.find((item: any) => item.status === status)?.count || 0)
    );
  });

  return {
    data: counts.map(Number), // Convert to numbers
    labels: statuses,
  };
};

const processBarChartData = (data: any) => {
  const statuses = ["Submitted", "Approved", "Rejected"];

  return {
    series: [
      {
        name: "Fleet Requests",
        data: statuses.map((status) =>
          Number(
            data.fleetData?.find((item: any) => item.status === status)
              ?.count || 0
          )
        ),
      },
      {
        name: "Maintenance Requests",
        data: statuses.map((status) =>
          Number(
            data.maintenanceData?.find((item: any) => item.status === status)
              ?.count || 0
          )
        ),
      },
      {
        name: "Fuel Requests",
        data: statuses.map((status) =>
          Number(
            data.fuelData?.find((item: any) => item.status === status)?.count ||
              0
          )
        ),
      },
    ],
    categories: statuses,
  };
};

const processLineChartData = (data: any) => {
  const statuses = ["Submitted", "Approved", "Rejected"];

  return {
    series: [
      {
        name: "Fleet Requests",
        data: statuses.map((status) =>
          Number(
            data.fleetData?.find((item: any) => item.status === status)
              ?.count || 0
          )
        ),
      },
      {
        name: "Maintenance Requests",
        data: statuses.map((status) =>
          Number(
            data.maintenanceData?.find((item: any) => item.status === status)
              ?.count || 0
          )
        ),
      },
      {
        name: "Fuel Requests",
        data: statuses.map((status) =>
          Number(
            data.fuelData?.find((item: any) => item.status === status)?.count ||
              0
          )
        ),
      },
    ],
    categories: statuses,
  };
};
const DashboardDisplay = () => {
  const { data, isLoading, isFetching } = useQueryRequest<any>({
    url: "/api/v1/dashboard",
  });
  const processedDonutData = useMemo(() => {
    if (data) {
      return processDonutChartData(data);
    }
    return { data: [], labels: [] };
  }, [data]);

  const processedLineChartData = useMemo(() => {
    if (data) {
      return processLineChartData(data);
    }
    return { series: [], categories: [] };
  }, [data]);

  const processedBarChartData = useMemo(() => {
    if (data) {
      return processBarChartData(data);
    }
    return { series: [], categories: [] };
  }, [data]);

  const fuelConsumption = useMemo(() => {
    if (data) {
      const tHour = data?.monthlyFuelConsumption?.map(
        (data: any) => data.month
      );
      const tTotal = data?.monthlyFuelConsumption?.map(
        (data: any) => data.totalFuel
      );
      return {
        series: [
          {
            name: "Total Fuel Consummation",
            data: tTotal,
          },
        ],
        categories: tHour,
      };
    }
    return { series: [], categories: [] };
  }, [data]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        <Flex className=" justify-between items-center">
          <div className="flex p-4 gap-4">
            <div className=" h-fit rounded-full p-2">
              <IconChartBar size={42} />
            </div>
            <div className="flex flex-col">
              <Text fw={600} fz={32}>
                Dashboard
              </Text>
            </div>
          </div>
        </Flex>
        {/* <StatusCards /> */}

        <div className="gap-4 flex-wrap px-4 grid grid-cols-1 md:grid-cols-2">
          <ChartContainer
            title="Request Status Distribution"
            className="w-full h-[300px]"
            isLoading={isLoading || isFetching}
          >
            <DonutChart
              data={processedDonutData.data}
              labels={processedDonutData.labels}
            />
          </ChartContainer>
          <ChartContainer
            title="Request Status by Type"
            className="w-full h-[300px]"
            isLoading={isLoading || isFetching}
          >
            <BarChart
              series={processedBarChartData.series}
              categories={processedBarChartData.categories}
            />
          </ChartContainer>
        </div>
        <div className="flex-wrap px-4">
          <ChartContainer
            title="Request Trends Over Time"
            className="w-full h-[300px]"
            isLoading={isLoading || isFetching}
          >
            <LineChart
              series={processedLineChartData.series}
              categories={processedLineChartData.categories}
            />
          </ChartContainer>
        </div>
        <div className="flex-wrap px-4">
          <ChartContainer
            title="Fuel Consumption"
            className="w-full h-[300px]"
            isLoading={isLoading || isFetching}
          >
            <ReactApexChart
              series={fuelConsumption.series}
              options={{
                chart: {
                  type: "area",
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "straight",
                },
                labels: fuelConsumption.categories,
              }}
              type="area"
              height={220}
              width={"100%"}
            />
          </ChartContainer>
        </div>
        {/* <BarChart /> */}
      </div>
    </div>
  );
};

export default DashboardDisplay;
