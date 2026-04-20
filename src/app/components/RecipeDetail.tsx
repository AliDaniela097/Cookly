import { X, Clock, Users, ChefHat, Sunrise, UtensilsCrossed, Leaf, Wind } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
 
const categoryGroups = [
  {
    badgeColor: "bg-orange-500 text-white",
    Icon: Sunrise,
    categories: ["Desayunos y Brunch", "Almuerzos", "Meriendas", "Cenas Ligeras"]
  },
  {
    badgeColor: "bg-blue-500 text-white",
    Icon: UtensilsCrossed,
    categories: ["Entrantes", "Platos Principales", "Guarniciones", "Postres"]
  },
  {
    badgeColor: "bg-green-500 text-white",
    Icon: Leaf,
    categories: ["Vegetariano/Vegano", "Bajo en Carbohidratos", "Sin Gluten", "Saludable"]
  },
  {
    badgeColor: "bg-purple-500 text-white",
    Icon: Wind,
    categories: ["Express <20min", "Sin Horno", "Air Fryer", "Cocción lenta"]
  }
];
 
function getCategoryStyle(category: string) {
  for (const group of categoryGroups) {
    if (group.categories.includes(category)) {
      return { badgeColor: group.badgeColor, Icon: group.Icon };
    }
  }
  return { badgeColor: "bg-primary text-white", Icon: ChefHat };
}
 
interface Recipe {
  id: number;
  title: string;
  image: string;
  time: string;
  servings: number;
  category: string;
  difficulty?: string;
  ingredients: string[];
  instructions: string[];
}
 
export function RecipeDetail({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  const { badgeColor, Icon } = getCategoryStyle(recipe.category);
 
  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-card rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-6 z-30 bg-card/95 backdrop-blur-md rounded-full p-2.5 shadow-lg border border-border hover:scale-110 transition"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>
 
        <div className="overflow-y-auto max-h-[90vh]">
 
          {/* IMAGEN */}
          <div className="relative h-64 md:h-72">
            <ImageWithFallback
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6 text-white">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}>
                <Icon className="w-3.5 h-3.5" />
                {recipe.category}
              </span>
              <h2 className="text-2xl md:text-3xl mt-2 font-semibold text-white">
                {recipe.title}
              </h2>
            </div>
          </div>
 
          {/* CONTENIDO */}
          <div className="p-6 md:p-8">
            <div className="flex gap-6 mb-6 border-b border-border pb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                {recipe.time}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                {recipe.servings} personas
              </div>
            </div>
 
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ChefHat className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Ingredientes</h3>
                </div>
                <ul className="space-y-2 text-foreground">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary">•</span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
 
              <div>
                <h3 className="font-semibold text-lg mb-3">Preparación</h3>
                <ol className="space-y-4">
                  {recipe.instructions.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="bg-primary text-white w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold flex-shrink-0 mt-1">
                        {i + 1}
                      </span>
                      <p className="text-foreground leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}