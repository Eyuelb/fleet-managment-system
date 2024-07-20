ALTER TABLE "fleet" DROP COLUMN IF EXISTS "start_location";--> statement-breakpoint
ALTER TABLE "fleet" DROP COLUMN IF EXISTS "end_location";--> statement-breakpoint
ALTER TABLE "fleet" DROP COLUMN IF EXISTS "startX";--> statement-breakpoint
ALTER TABLE "fleet" DROP COLUMN IF EXISTS "startY";--> statement-breakpoint
ALTER TABLE "fleet" DROP COLUMN IF EXISTS "endX";--> statement-breakpoint
ALTER TABLE "fleet" DROP COLUMN IF EXISTS "endY";--> statement-breakpoint
ALTER TABLE "fleet" DROP COLUMN IF EXISTS "distance";--> statement-breakpoint
ALTER TABLE "fleet" DROP COLUMN IF EXISTS "requested_for";--> statement-breakpoint
ALTER TABLE "fleet" DROP COLUMN IF EXISTS "requested_by";--> statement-breakpoint
ALTER TABLE "fleet" DROP COLUMN IF EXISTS "approved_by";--> statement-breakpoint
ALTER TABLE "fleet" DROP COLUMN IF EXISTS "note";