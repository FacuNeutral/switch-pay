//* @type Page
//* @context Shorts
//* @utility Página de Shorts: feed vertical de videos cortos con scroll snap.

import ShortsFeed from "@/application/shorts/components/ShortsFeed";

export default function ShortsPage() {
  return (
    <div className="flex justify-center py-2">
      <ShortsFeed />
    </div>
  );
}
