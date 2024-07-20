DO $$ BEGIN
 CREATE TYPE "public"."request_status" AS ENUM('Submitted', 'Approved', 'Rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."trip_status" AS ENUM('Completed', 'OnGoing', 'Cancelled', 'YetToStart');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."visibility_status" AS ENUM('Active', 'Inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fleet_request" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"driver" text NOT NULL,
	"vehicle" text NOT NULL,
	"start_location" text,
	"end_location" text,
	"startX" text,
	"startY" text,
	"endX" text,
	"endY" text,
	"distance" text,
	"status" "trip_status",
	"requested_for" text,
	"requested_by" text,
	"approved_by" text,
	"note" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fuel_request" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"driver" text NOT NULL,
	"vehicle" text NOT NULL,
	"fuel_type" text NOT NULL,
	"fueling_date_time" timestamp NOT NULL,
	"gallons_liters_of_fuel" numeric NOT NULL,
	"cost_per_gallon_liter" numeric NOT NULL,
	"total_cost" numeric NOT NULL,
	"status" "request_status",
	"requested_for" text,
	"requested_by" text,
	"approved_by" text,
	"note" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "maintenance_request" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"vehicle_name" text NOT NULL,
	"maintenance_type" text NOT NULL,
	"maintenance_service_provider_name" text NOT NULL,
	"maintenance_date_time" timestamp NOT NULL,
	"cost" numeric NOT NULL,
	"charge_bear_by" text,
	"status" "request_status",
	"requested_for" text,
	"requested_by" text,
	"approved_by" text,
	"note" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"password" text,
	"image" text,
	"role" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"type" text,
	"make" text,
	"model" text,
	"year" integer,
	"license_plate" text,
	"vehicle_identification_number" text,
	"seat_capacity" text,
	"status" "visibility_status",
	"driver" text
);
