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
DROP TABLE "fleet";