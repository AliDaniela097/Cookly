import { useNavigate } from "react-router";

interface CategoryFilterProps {
  categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">

      <button
        onClick={() => navigate("/buscar")}
        className="px-4 py-2 rounded-lg bg-secondary"
      >
        Todas
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => navigate(`/recetas/${encodeURIComponent(category)}`)}
          className="px-4 py-2 rounded-lg bg-secondary"
        >
          {category}
        </button>
      ))}
    </div>
  );
}