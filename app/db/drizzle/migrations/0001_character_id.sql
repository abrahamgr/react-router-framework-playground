ALTER TABLE "favorites" RENAME COLUMN "id" TO "characterId";--> statement-breakpoint
DROP INDEX "favorite_id_idx";--> statement-breakpoint
ALTER TABLE "favorites" ALTER COLUMN "userId" SET NOT NULL;