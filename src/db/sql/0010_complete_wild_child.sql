ALTER TABLE "fleet_request" ALTER COLUMN "status" SET DATA TYPE request_status;--> statement-breakpoint
ALTER TABLE "fleet_request" ADD COLUMN "trip-status" "trip_status";