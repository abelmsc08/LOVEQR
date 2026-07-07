import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PublicPage } from "./public-page";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = await db.page.findUnique({ where: { slug } });
  if (!page) return { title: "Página não encontrada" };

  const isAniversario = page.planId === "aniversario";
  const title = isAniversario
    ? page.title || "Feliz Aniversário!"
    : page.names || "Meu QR Love";

  return {
    title,
    description: page.message || "Uma mensagem especial feita com carinho.",
  };
}

export default async function PageView({ params }: Props) {
  const { slug } = await params;
  const page = await db.page.findUnique({ where: { slug } });

  if (!page) notFound();

  if (page.expiresAt && page.expiresAt < new Date()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-6">
        <div className="text-center">
          <p className="text-4xl">⏰</p>
          <h1 className="mt-4 font-display text-2xl font-bold text-white">
            Essa página expirou
          </h1>
          <p className="mt-2 text-white/50">
            O período de acesso a este presente terminou.
          </p>
        </div>
      </main>
    );
  }

  return (
    <PublicPage
      planId={page.planId}
      names={page.names}
      message={page.message}
      since={page.since}
      themeId={page.themeId}
      title={page.title}
      openDate={page.openDate}
      openImmediately={page.openImmediately}
      confettiEffect={page.confettiEffect}
      songTitle={page.songTitle}
      songArtist={page.songArtist}
      songThumbnail={page.songThumbnail}
      songVideoId={page.songVideoId}
      songStartSeconds={page.songStartSeconds}
      photos={page.photos as string[]}
      movieTitle={page.movieTitle}
      tagline={page.tagline}
      synopsis={page.synopsis}
      showDateOnPoster={page.showDateOnPoster}
      cinemaMessage={page.cinemaMessage}
      cinemaPhotos={page.cinemaPhotos as string[]}
    />
  );
}
