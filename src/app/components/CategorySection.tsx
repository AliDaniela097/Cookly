import { useNavigate } from "react-router";
import {
  Sunrise,
  Coffee,
  Apple,
  Moon,
  UtensilsCrossed,
  Soup,
  Cake,
  Leaf,
  Flame,
  Wheat,
  Dumbbell,
  Clock,
  Microwave,
  Wind,
  ChefHat
} from "lucide-react";

interface CategorySectionProps {
  selectedCategory: string;
}

const categoryGroups = [
  {
    title: "Recetas del Día",
    icon: Sunrise,
    color: "bg-orange-100 text-orange-600",
    categories: [
      { name: "Desayunos y Brunch", icon: Coffee },
      { name: "Almuerzos", icon: UtensilsCrossed },
      { name: "Meriendas", icon: Apple },
      { name: "Cenas Ligeras", icon: Moon }
    ]
  },
  {
    title: "Por Tipo de Plato",
    icon: UtensilsCrossed,
    color: "bg-blue-100 text-blue-600",
    categories: [
      { name: "Entrantes", icon: Soup },
      { name: "Platos Principales", icon: UtensilsCrossed },
      { name: "Guarniciones", icon: Leaf },
      { name: "Postres", icon: Cake }
    ]
  },
  {
    title: "Por Dieta o Estilo",
    icon: Leaf,
    color: "bg-green-100 text-green-600",
    categories: [
      { name: "Vegetariano/Vegano", icon: Leaf },
      { name: "Bajo en Carbohidratos", icon: Flame },
      { name: "Sin Gluten", icon: Wheat },
      { name: "Saludable", icon: Dumbbell }
    ]
  },
  {
    title: "Por Método de Elaboración",
    icon: ChefHat,
    color: "bg-purple-100 text-purple-600",
    categories: [
      { name: "Express <20min", icon: Clock },
      { name: "Sin Horno", icon: Microwave },
      { name: "Air Fryer", icon: Wind },
      { name: "Cocción lenta", icon: ChefHat }
    ]
  }
];

export function CategorySection({ selectedCategory }: CategorySectionProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-12">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          Explora por Categorías
        </h2>

        <button
          onClick={() => navigate("/buscar")}
          className="px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground"
        >
          Ver Todas
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {categoryGroups.map((group) => {
          const GroupIcon = group.icon;

          return (
            <div
              key={group.title}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition"
            >

              {/* TÍTULO */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${group.color}`}>
                  <GroupIcon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-medium">
                  {group.title}
                </h3>
              </div>

              {/* CATEGORÍAS */}
              <div className="space-y-2">

                {group.categories.map((category) => {
                  const CategoryIcon = category.icon;

                  return (
                    <button
                      key={category.name}
                      onClick={() =>
                        navigate(`/buscar?categoria=${encodeURIComponent(category.name)}`)
                      }
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition text-left ${
                        selectedCategory === category.name
                          ? "bg-primary text-white"
                          : "hover:bg-secondary"
                      }`}
                    >
                      <CategoryIcon className="w-4 h-4" />
                      <span className="text-sm">
                        {category.name}
                      </span>
                    </button>
                  );
                })}

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
