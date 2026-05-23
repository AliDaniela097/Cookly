import { Clock, Users, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./Layout";
import { supabase } from "../supabase";
 
interface Recipe {
  id: number;
  title: string;
  category: string;
  image: string;
  time: string;
  servings: number;
  difficulty?: string;
  ingredients: string[];
  instructions: string[];
}
 
interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}
 
export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const ctx = useContext(AuthContext);
  const user = ctx?.user ?? null;
  const openRegister = ctx?.openRegister ?? (() => {});
 
  const [isFavorite, setIsFavorite] = useState(false);
 
  // Verifica si es favorito desde Supabase
  useEffect(() => {
    if (!user) return;
    const verificar = async () => {
      const { data } = await supabase
        .from("favoritos")
        .select("id")
        .eq("user_correo", user.correo)
        .eq("recipe_id", recipe.id)
        .single();
      setIsFavorite(!!data);
    };
    verificar();
  }, [recipe.id, user]);
 
  // Escucha cambios para actualizar el corazón
  useEffect(() => {
    const actualizar = () => {
      if (!user) return;
      supabase
        .from("favoritos")
        .select("id")
        .eq("user_correo", user.correo)
        .eq("recipe_id", recipe.id)
        .single()
        .then(({ data }) => setIsFavorite(!!data));
    };
    window.addEventListener("storage", actualizar);
    return () => window.removeEventListener("storage", actualizar);
  }, [recipe.id, user]);
 
  const handleFavorito = async (e: React.MouseEvent) => {
    e.stopPropagation();
 
    if (!user) {
      openRegister(recipe);
      return;
    }
 
    if (isFavorite) {
      // Quitar de favoritos
      await supabase
        .from("favoritos")
        .delete()
        .eq("user_correo", user.correo)
        .eq("recipe_id", recipe.id);
      setIsFavorite(false);
    } else {
      // Agregar a favoritos
      await supabase
        .from("favoritos")
        .insert([{
          user_correo: user.correo,
          recipe_id: recipe.id,
          recipe_data: recipe
        }]);
      setIsFavorite(true);
    }
 
    // Notifica a Favoritos.tsx para que recargue
    window.dispatchEvent(new Event("storage"));
  };
 
  const difficultyColors: Record<string, string> = {
    "Fácil": "bg-green-100 text-green-700",
    "Media": "bg-yellow-100 text-yellow-700",
    "Difícil": "bg-red-100 text-red-700"
  };
 
  return (
    <div
      onClick={onClick}
      className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer border border-border"
    >
      <div className="relative h-52">
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-110 transition"
        />
 
        <button
          onClick={handleFavorito}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-500"}`} />
        </button>
 
        <span className={`absolute top-3 left-3 px-2 py-1 text-xs rounded-full ${difficultyColors[recipe.difficulty || "Fácil"]}`}>
          {recipe.difficulty || "Fácil"}
        </span>
      </div>
 
      <div className="p-4">
        <p className="text-xs text-primary">{recipe.category}</p>
        <h3 className="mt-1 mb-3">{recipe.title}</h3>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {recipe.time}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" /> {recipe.servings}
          </span>
        </div>
      </div>
    </div>
  );
}
