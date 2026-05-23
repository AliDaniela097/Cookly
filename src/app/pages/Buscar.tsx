import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Search } from "lucide-react";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeDetail } from "../components/RecipeDetail";
import { useRecipes } from "../data/useRecipes";

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function Buscar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { recipes, loading } = useRecipes();

  const params = new URLSearchParams(location.search);
  const categoriaURL = params.get("categoria") || "";
  const qURL = params.get("q") || "";
  const dificultadURL = params.get("dificultad") || "";

  // searchTerm es local — filtra en tiempo real sin tocar la URL
  const [searchTerm, setSearchTerm] = useState(qURL);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.search]);

  useEffect(() => {
    setSearchTerm(qURL);
  }, [qURL]);

  // Filtra localmente — no va a Supabase en cada letra
  const filtered = recipes.filter((r) => {
    const matchCategoria = categoriaURL ? r.category === categoriaURL : true;
    const matchDificultad = dificultadURL
      ? normalizar(r.difficulty) === normalizar(dificultadURL)
      : true;

    if (!searchTerm.trim()) return matchCategoria && matchDificultad;

    const term = normalizar(searchTerm);
    const titulo = normalizar(r.title);
    const categoria = normalizar(r.category);

    const enTitulo = titulo.includes(term);
    const enIngredientes = r.ingredients.some((ing: string) =>
      normalizar(ing).includes(term)
    );
    const palabrasCategoria = categoria.split(/[\s\/]+/);
    const enCategoria =
      categoria.includes(term) ||
      term.includes(categoria) ||
      palabrasCategoria.some((palabra: string) =>
        palabra.startsWith(term) ||
        term.startsWith(palabra) ||
        palabra.includes(term)
      );

    return matchCategoria && matchDificultad && (enTitulo || enIngredientes || enCategoria);
  });

  // Solo actualiza la URL al presionar Enter o al limpiar
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const nuevosParams = new URLSearchParams(location.search);
      if (searchTerm) { nuevosParams.set("q", searchTerm); } else { nuevosParams.delete("q"); }
      navigate(`/buscar?${nuevosParams.toString()}`, { replace: true });
    }
  };

  const handleLimpiarBusqueda = () => {
    setSearchTerm("");
    const nuevosParams = new URLSearchParams(location.search);
    nuevosParams.delete("q");
    navigate(`/buscar?${nuevosParams.toString()}`, { replace: true });
  };

  const handleDificultad = (dif: string) => {
    const nuevosParams = new URLSearchParams(location.search);
    if (dif === "" || normalizar(dif) === normalizar(dificultadURL)) {
      nuevosParams.delete("dificultad");
    } else {
      nuevosParams.set("dificultad", dif);
    }
    navigate(`/buscar?${nuevosParams.toString()}`, { replace: true });
  };

  const categorias = ["Todas", ...Array.from(new Set(recipes.map((r) => r.category)))];

  return (
    <main className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl mb-6">
        {categoriaURL ? categoriaURL : "Buscar Recetas"}
      </h1>

      {/* Buscador en tiempo real */}
      <div className="relative mb-4">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar por receta, ingrediente o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-10 py-3 border border-border rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
        />
        {searchTerm && (
          <button
            onClick={handleLimpiarBusqueda}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* Filtro por dificultad */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-sm text-muted-foreground">Dificultad:</span>
        {["Fácil", "Media", "Difícil"].map((dif) => (
          <button
            key={dif}
            onClick={() => handleDificultad(dif)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              normalizar(dificultadURL) === normalizar(dif)
                ? dif === "Fácil" ? "bg-green-500 text-white"
                  : dif === "Media" ? "bg-yellow-500 text-white"
                  : "bg-red-500 text-white"
                : dif === "Fácil" ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : dif === "Media" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
            }`}
          >
            {dif}
          </button>
        ))}
        {dificultadURL && (
          <button
            onClick={() => handleDificultad("")}
            className="px-3 py-1.5 rounded-full text-sm bg-secondary text-muted-foreground hover:bg-secondary/80 transition"
          >
            × Limpiar
          </button>
        )}
      </div>

      {/* Filtro por categoría */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">Categoría:</p>
        <div className="flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                const nuevosParams = new URLSearchParams(location.search);
                if (cat === "Todas") { nuevosParams.delete("categoria"); } else { nuevosParams.set("categoria", cat); }
                navigate(`/buscar?${nuevosParams.toString()}`, { replace: true });
              }}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                (cat === "Todas" && !categoriaURL) || cat === categoriaURL
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Contador */}
      {loading ? (
        <p className="text-sm text-muted-foreground mb-4">Cargando recetas...</p>
      ) : (
        <p className="text-sm text-muted-foreground mb-4">{filtered.length} recetas encontradas</p>
      )}

      {/* Resultados */}
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <p className="text-center text-muted-foreground mt-10">No hay recetas que coincidan.</p>
      )}

      {selectedRecipe && (
        <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}

    </main>
  );
}