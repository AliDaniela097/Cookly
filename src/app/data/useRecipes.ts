import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export interface Recipe {
  id: number;
  title: string;
  image: string;
  time: string;
  servings: number;
  category: string;
  difficulty: "Fácil" | "Media" | "Difícil";
  ingredients: string[];
  instructions: string[];
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargar() {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("id", { ascending: true });
      if (!error && data) setRecipes(data);
      setLoading(false);
    }
    cargar();
  }, []);

  return { recipes, loading };
}