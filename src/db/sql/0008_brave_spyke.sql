ALTER TABLE "fleet_request" ADD COLUMN "created_by" text;--> statement-breakpoint
ALTER TABLE "fleet_request" ADD COLUMN "updated_by" text;--> statement-breakpoint
ALTER TABLE "fuel_request" ADD COLUMN "created_by" text;--> statement-breakpoint
ALTER TABLE "fuel_request" ADD COLUMN "updated_by" text;--> statement-breakpoint
ALTER TABLE "maintenance_request" ADD COLUMN "created_by" text;--> statement-breakpoint
ALTER TABLE "maintenance_request" ADD COLUMN "updated_by" text;--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "created_by" text;--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "updated_by" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_by" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_by" text;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "created_by" text;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "updated_by" text;