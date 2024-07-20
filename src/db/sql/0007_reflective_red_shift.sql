ALTER TABLE "maintenance_request" RENAME COLUMN "vehicle_name" TO "driver";--> statement-breakpoint
ALTER TABLE "fuel_request" ALTER COLUMN "fueling_date_time" SET DATA TYPE timestamp(6) with time zone;--> statement-breakpoint
ALTER TABLE "maintenance_request" ALTER COLUMN "maintenance_date_time" SET DATA TYPE timestamp(6) with time zone;--> statement-breakpoint
ALTER TABLE "maintenance_request" ADD COLUMN "vehicle" text NOT NULL;