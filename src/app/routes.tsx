import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { MisRecetas, Perfil } from "./pages/MisRecetas";
import { Favoritos } from "./pages/Favoritos";
import { Buscar } from "./pages/Buscar";
import { Salud } from "./components/FeaturedCarousel";
import { Admin } from "./pages/Admin";
 
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "mis-recetas", Component: MisRecetas },
      { path: "favoritos", Component: Favoritos },
      { path: "buscar", Component: Buscar },
      { path: "perfil", Component: Perfil },
      { path: "salud", Component: Salud },
    ],
  },
  // Ruta admin separada — no usa Layout de Cookly
  {
    path: "/admin",
    Component: Admin,
  },
]);
