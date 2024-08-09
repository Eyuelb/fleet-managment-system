import { db } from "@db/index";
import { fleetRequest, fuelRequest, maintenanceRequest } from "@db/schema";
import { ApiRequestContext } from "@models/request";
import logger from "@utils/logger";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const { GET } = {
  GET: async function (request: NextRequest, ctx: ApiRequestContext) {
    try {
      const [
        fleetData,
        maintenanceData,
        fuelData,
        fuelConsumption,
        // topRequestedRoutes,
      ] = await Promise.all([
        // Fleet Request Data
        db
          .select({
            status: fleetRequest.status,
            count: sql<number>`COUNT(*)`,
          })
          .from(fleetRequest)
          .groupBy(fleetRequest.status),

        // Maintenance Request Data
        db
          .select({
            status: maintenanceRequest.status,
            count: sql<number>`COUNT(*)`,
          })
          .from(maintenanceRequest)
          .groupBy(maintenanceRequest.status),

        // Fuel Request Data
        db
          .select({
            status: fuelRequest.status,
            count: sql<number>`COUNT(*)`,
          })
          .from(fuelRequest)
          .groupBy(fuelRequest.status),

        // Fuel Consumption Report
        db
          .select({
            month: sql`TO_CHAR(fuel_request.fueling_date_time, 'YYYY-MM') AS month`,
            totalFuel: sql`SUM(fuel_request.gallons_liters_of_fuel)`,
          })
          .from(fuelRequest)
          .where(sql`fuel_request.status = 'Approved'`)
          .groupBy(sql`month`)
          .orderBy(sql`month`),

        // Top 5 Requested Routes
        // db
        //   .select({
        //     route: sql`CONCAT(fleet_request.start_location, ' to ', fleet_request.end_location)`,
        //     count: sql`COUNT(*)`,
        //   })
        //   .from(fleetRequest)
        //   .groupBy(sql`route`)
        //   .orderBy(sql`COUNT(*) DESC`)
        //   .limit(5),
      ]);
      const currentYear = new Date().getFullYear();
      const months = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        return {
          month: `${currentYear}-${month.toString().padStart(2, "0")}`,
          totalFuel: 0,
        };
      });
      const monthlyFuelConsumption = (await db
        .select({
          month: sql`TO_CHAR(fuel_request.fueling_date_time, 'YYYY-MM') AS month`,
          totalFuel: sql`SUM(fuel_request.gallons_liters_of_fuel)`,
        })
        .from(fuelRequest)
        .where(sql`fuel_request.status = 'Approved'`)
        .groupBy(sql`month`)
        .orderBy(sql`month`)) as any;

      // Merge the data with all months
      monthlyFuelConsumption.forEach(({ month, totalFuel }: any) => {
        const monthIndex = months.findIndex((m) => m.month === month);
        if (monthIndex !== -1) {
          months[monthIndex].totalFuel = totalFuel;
        }
      });

      return NextResponse.json(
        {
          fleetData,
          maintenanceData,
          fuelData,
          fuelConsumption,
          monthlyFuelConsumption: months,
          // topRequestedRoutes,
        },
        { status: 200 }
      );
    } catch (error) {
      logger.error(error);
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }
  },
};
