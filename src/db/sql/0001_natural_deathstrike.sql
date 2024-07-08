ALTER TABLE "fleet" RENAME COLUMN "status" TO "statusEnum";--> statement-breakpoint
ALTER TABLE "fleet" ALTER COLUMN "statusEnum" SET DATA TYPE statusEnum;--> statement-breakpoint
ALTER TABLE "serviceRequest" ALTER COLUMN "request" SET DATA TYPE requestEnum;