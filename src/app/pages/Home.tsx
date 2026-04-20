import { FeaturedCarousel } from "../components/FeaturedCarousel";
import { CategorySection } from "../components/CategorySection";
 
export function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <FeaturedCarousel />
      <div id="categorias">
        <CategorySection selectedCategory="" />
      </div>
    </main>
  );
}
 