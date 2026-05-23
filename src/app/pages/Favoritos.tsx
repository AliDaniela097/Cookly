import { useContext, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeDetail } from "../components/RecipeDetail";
import { AuthContext } from "../components/Layout";
import { supabase } from "../supabase";

type Recipe = {
  id: number;
  title: string;
  category: string;
  image: string;
  time: string;
  servings: number;
  difficulty?: string;
  ingredients: string[];
  instructions: string[];
};

export function Favoritos() {
  const ctx = useContext(AuthContext);
  const user = ctx?.user ?? null;
  const openRegister = ctx?.openRegister ?? (() => {});

  const [favoritos, setFavoritos] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const cargarFavoritos = async () => {
    if (!user) { setLoading(false); return; }

    const { data, error } = await supabase
      .from("favoritos")
      .select("recipe_data")
      .eq("user_correo", user.correo);

    if (!error && data) {
      setFavoritos(data.map((f: any) => f.recipe_data));
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarFavoritos();

    const actualizar = () => cargarFavoritos();
    window.addEventListener("storage", actualizar);
    return () => window.removeEventListener("storage", actualizar);
  }, [user]);

  if (!user) {
    return (
      <main className="max-w-7xl mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-card border border-border rounded-2xl p-12 max-w-md shadow-sm">
          <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl mb-2">Regístrate para guardar favoritos</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Crea tu cuenta y guarda las recetas que más te gustan.
          </p>
          <button
            onClick={() => openRegister()}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:opacity-90 transition"
          >
            Crear cuenta
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl mb-2">❤️ Mis Favoritos</h1>
      <p className="text-muted-foreground mb-6">
        {favoritos.length} {favoritos.length === 1 ? "receta guardada" : "recetas guardadas"}
      </p>

      {loading ? (
        <p className="text-center text-muted-foreground py-10">Cargando favoritos...</p>
      ) : favoritos.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {favoritos.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <Heart className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Aún no tienes recetas favoritas.</p>
          <p className="text-sm mt-1">Toca el corazón en cualquier receta para guardarla aquí.</p>
        </div>
      )}

      {selectedRecipe && (
        <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </main>
  );
}