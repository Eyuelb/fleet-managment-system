import { db } from "@db/index";
import { queryBuilder } from "@db/manage";
import { fleetRequest, maintenanceRequest,fuelRequest } from "@db/schema";
import { ApiRequestContext } from "@models/request";
import logger from "@utils/logger";
import { count, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const { GET } = {
  GET: async function (request: NextRequest, ctx: ApiRequestContext) {
    try {
      const d = await db.transaction(async (tx) => {
        const fleetCountSubmitted = tx
          .select({ value: count() })
          .from(fleetRequest)
          .where(eq(fleetRequest.status, "Submitted"));
        
        const fleetCountApproved = tx
          .select({ value: count() })
          .from(fleetRequest)
          .where(eq(fleetRequest.status, "Approved"));
      
        const fleetCountRejected = tx
          .select({ value: count() })
          .from(fleetRequest)
          .where(eq(fleetRequest.status, "Rejected"));
      
        const maintenanceCountSubmitted = tx
          .select({ value: count() })
          .from(maintenanceRequest)
          .where(eq(maintenanceRequest.status, "Submitted"));
      
        const maintenanceCountApproved = tx
          .select({ value: count() })
          .from(maintenanceRequest)
          .where(eq(maintenanceRequest.status, "Approved"));
      
        const maintenanceCountRejected = tx
          .select({ value: count() })
          .from(maintenanceRequest)
          .where(eq(maintenanceRequest.status, "Rejected"));
      
        const fuelCountSubmitted = tx
          .select({ value: count() })
          .from(fuelRequest)
          .where(eq(fuelRequest.status, "Submitted"));
      
        const fuelCountApproved = tx
          .select({ value: count() })
          .from(fuelRequest)
          .where(eq(fuelRequest.status, "Approved"));
      
        const fuelCountRejected = tx
          .select({ value: count() })
          .from(fuelRequest)
          .where(eq(fuelRequest.status, "Rejected"));
      
        const [
          [fleetCountSubmittedT], [fleetCountApprovedT], [fleetCountRejectedT],
          [maintenanceCountSubmittedT], [maintenanceCountApprovedT], [maintenanceCountRejectedT],
          [fuelCountSubmittedT], [fuelCountApprovedT], [fuelCountRejectedT]
        ] = await Promise.all([
          fleetCountSubmitted,
          fleetCountApproved,
          fleetCountRejected,
          maintenanceCountSubmitted,
          maintenanceCountApproved,
          maintenanceCountRejected,
          fuelCountSubmitted,
          fuelCountApproved,
          fuelCountRejected,
        ]);
      
        return {
          pendingFleetRequest: fleetCountSubmittedT.value,
          approvedFleetRequest: fleetCountApprovedT.value,
          rejectedFleetRequest: fleetCountRejectedT.value,
          pendingMaintenanceRequest: maintenanceCountSubmittedT.value,
          approvedMaintenanceRequest: maintenanceCountApprovedT.value,
          rejectedMaintenanceRequest: maintenanceCountRejectedT.value,
          pendingFuelRequest: fuelCountSubmittedT.value,
          approvedFuelRequest: fuelCountApprovedT.value,
          rejectedFuelRequest: fuelCountRejectedT.value,
        };
      });
      
      // const result = await db
      //   .select()
      //   .from(fleetRequest)
      //   .where(eq(fleetRequest.status, "Submitted"));

      return NextResponse.json(d, { status: 200 });
    } catch (error) {
      logger.error(error);
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }
  },
};
