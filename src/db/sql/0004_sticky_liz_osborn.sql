ALTER TABLE "fleet" RENAME COLUMN "driver" TO "name";--> statement-breakpoint
ALTER TABLE "fleet" RENAME COLUMN "vehicle" TO "description";--> statement-breakpoint
ALTER TABLE "fleet" ALTER COLUMN "description" DROP NOT NULL;