import { Link } from "react-router";
import { ChefHat, Heart } from "lucide-react";
 
export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
 
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-primary to-accent text-white p-2.5 rounded-xl shadow-md">
                <ChefHat className="w-6 h-6" />
              </div>
              <h3 className="text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Cookly
              </h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4 max-w-md">
              Tu compañero de cocina perfecto. Descubre, guarda y comparte recetas deliciosas para cada momento del día. Cocinar nunca fue tan fácil.
            </p>
          </div>
 
          {/* Enlaces rápidos */}
          <div>
            <h4 className="mb-4 text-sm">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/salud" className="hover:text-primary transition-colors">
                  Noticias
                </Link>
              </li>
              <li>
                <Link to="/mis-recetas" className="hover:text-primary transition-colors">
                  Recetas Descargables
                </Link>
              </li>
              <li>
                <Link to="/favoritos" className="hover:text-primary transition-colors">
                  Favoritos
                </Link>
              </li>
              <li>
                <Link to="/buscar" className="hover:text-primary transition-colors">
                  Buscar Recetas
                </Link>
              </li>
            </ul>
          </div>
 
          {/* Categorías */}
          <div>
            <h4 className="mb-4 text-sm">Categorías</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/buscar?categoria=Desayunos%20y%20Brunch" className="hover:text-primary transition-colors">
                  Desayunos
                </Link>
              </li>
              <li>
                <Link to="/buscar?categoria=Vegetariano%2FVegano" className="hover:text-primary transition-colors">
                  Vegetariano
                </Link>
              </li>
              <li>
                <Link to="/buscar?categoria=Express%20%3C20min" className="hover:text-primary transition-colors">
                  Recetas Express
                </Link>
              </li>
              <li>
                <Link to="/buscar?categoria=Saludable" className="hover:text-primary transition-colors">
                  Saludable
                </Link>
              </li>
            </ul>
          </div>
 
        </div>
 
        {/* Línea divisoria */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Cookly. Todos los derechos reservados. Alisson Basantes
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>para los amantes de la cocina</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
