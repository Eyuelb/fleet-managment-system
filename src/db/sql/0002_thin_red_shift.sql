DO $$ BEGIN
 CREATE TYPE "public"."requestEnum" AS ENUM('Fuel', 'Maintenance', 'Fleet');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."statusEnum" AS ENUM('Submitted', 'Approved', 'Rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "serviceRequest" RENAME COLUMN "request" TO "requestEnum";