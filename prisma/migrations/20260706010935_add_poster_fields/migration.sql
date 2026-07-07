-- AlterTable
ALTER TABLE "pages" ADD COLUMN     "cinemaMessage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "movieTitle" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "showDateOnPoster" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "synopsis" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "tagline" TEXT NOT NULL DEFAULT '';
