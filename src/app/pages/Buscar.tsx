import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Search } from "lucide-react";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeDetail } from "../components/RecipeDetail";
import { recipes } from "../data/recipes";
 
type Recipe = typeof recipes[0];
 
// Elimina tildes y convierte a minúsculas para comparar
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
 
export function Buscar() {
  const location = useLocation();
  const navigate = useNavigate();
 
  const params = new URLSearchParams(location.search);
  const categoriaURL = params.get("categoria") || "";
  const qURL = params.get("q") || "";
  const dificultadURL = params.get("dificultad") || "";
 
  const [searchTerm, setSearchTerm] = useState(qURL);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.search]);
 
  useEffect(() => {
    setSearchTerm(qURL);
  }, [qURL]);
 
  const filtered = recipes.filter((r) => {
    const matchCategoria = categoriaURL ? r.category === categoriaURL : true;
    const matchDificultad = dificultadURL ? r.difficulty === dificultadURL : true;
 
    // Busca sin importar tildes ni mayúsculas
    const term = normalizar(searchTerm);
    const matchSearch = searchTerm
      ? normalizar(r.title).includes(term) ||
        r.ingredients.some((ing) => normalizar(ing).includes(term))
      : true;
 
    return matchCategoria && matchSearch && matchDificultad;
  });
 
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const nuevosParams = new URLSearchParams(location.search);
    if (value) { nuevosParams.set("q", value); } else { nuevosParams.delete("q"); }
    navigate(`/buscar?${nuevosParams.toString()}`, { replace: true });
  };
 
  const handleDificultad = (dif: string) => {
    const nuevosParams = new URLSearchParams(location.search);
    if (dif === "" || dif === dificultadURL) {
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
 
      {/* Buscador */}
      <div className="relative mb-4">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar por receta o ingrediente..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
        />
      </div>
 
      {/* Filtro por dificultad */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-sm text-muted-foreground">Dificultad:</span>
        {["Fácil", "Media", "Difícil"].map((dif) => (
          <button
            key={dif}
            onClick={() => handleDificultad(dif)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              dificultadURL === dif
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
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              const nuevosParams = new URLSearchParams(location.search);
              if (cat === "Todas") { nuevosParams.delete("categoria"); } else { nuevosParams.set("categoria", cat); }
              navigate(`/buscar?${nuevosParams.toString()}`, { replace: true });
            }}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition ${
              (cat === "Todas" && !categoriaURL) || cat === categoriaURL
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
 
      {/* Contador */}
      <p className="text-sm text-muted-foreground mb-4">{filtered.length} recetas encontradas</p>
 
      {/* Resultados */}
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
        ))}
      </div>
 
      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground mt-10">No hay recetas que coincidan.</p>
      )}
 
      {selectedRecipe && (
        <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
 
    </main>
  );
}