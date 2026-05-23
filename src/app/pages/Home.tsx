import { FeaturedCarousel } from "../components/FeaturedCarousel";
import { CategorySection } from "../components/CategorySection";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { supabase } from "../supabase";

interface Video {
  id: number;
  titulo: string;
  canal: string;
  youtube_id: string;
}

const POR_PAGINA = 3;

function VideoCarousel() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [pagina, setPagina] = useState(0);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const cargar = async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("id", { ascending: true });
      if (!error && data) setVideos(data);
    };
    cargar();
  }, []);

  if (videos.length === 0) return null;

  const totalPaginas = Math.ceil(videos.length / POR_PAGINA);
  const inicio = pagina * POR_PAGINA;
  const videosVisibles = videos.slice(inicio, inicio + POR_PAGINA);

  const prev = () => {
    setActiveId(null);
    setPagina((p) => (p === 0 ? totalPaginas - 1 : p - 1));
  };

  const next = () => {
    setActiveId(null);
    setPagina((p) => (p === totalPaginas - 1 ? 0 : p + 1));
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Videos Recomendados</h2>
        {totalPaginas > 1 && (
          <div className="flex gap-2">
            <button onClick={prev} className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={next} className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videosVisibles.map((video) => (
          <div key={video.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
            {activeId === video.id ? (
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1`}
                  title={video.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div
                className="relative aspect-video cursor-pointer group"
                onClick={() => setActiveId(video.id)}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`}
                  alt={video.titulo}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition flex items-center justify-center">
                  <div className="bg-red-600 text-white p-3 rounded-full shadow-lg group-hover:scale-110 transition">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                </div>
              </div>
            )}
            <div className="p-4">
              <p className="text-xs text-primary font-medium mb-1">{video.canal}</p>
              <h3 className="text-sm font-semibold text-foreground leading-snug">{video.titulo}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Puntos indicadores */}
      {totalPaginas > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveId(null); setPagina(i); }}
              className={`rounded-full transition-all ${i === pagina ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-gray-300"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <FeaturedCarousel />
      <div id="categorias">
        <CategorySection selectedCategory="" />
      </div>
      <VideoCarousel />
    </main>
  );
}