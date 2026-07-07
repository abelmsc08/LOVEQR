-- CreateTable
CREATE TABLE "pages" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "names" TEXT NOT NULL DEFAULT '',
    "message" TEXT NOT NULL DEFAULT '',
    "since" TEXT NOT NULL DEFAULT '',
    "themeId" TEXT NOT NULL DEFAULT 'crimson',
    "title" TEXT NOT NULL DEFAULT '',
    "openDate" TEXT NOT NULL DEFAULT '',
    "openImmediately" BOOLEAN NOT NULL DEFAULT false,
    "confettiEffect" BOOLEAN NOT NULL DEFAULT true,
    "songTitle" TEXT NOT NULL DEFAULT '',
    "songArtist" TEXT NOT NULL DEFAULT '',
    "songThumbnail" TEXT NOT NULL DEFAULT '',
    "songVideoId" TEXT NOT NULL DEFAULT '',
    "songStartSeconds" INTEGER NOT NULL DEFAULT 0,
    "musicAddOn" BOOLEAN NOT NULL DEFAULT false,
    "photos" JSONB NOT NULL DEFAULT '[]',
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pages_slug_key" ON "pages"("slug");
