
import { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { X, CheckCircle } from "lucide-react";
 
export interface UserType {
  nombre: string;
  correo: string;
  contrasena: string;
  foto?: string;
}
 
export interface RecipeType {
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
 
export interface AuthContextType {
  user: UserType | null;
  logout: () => void;
  openRegister: (recipe?: RecipeType) => void;
  register: (nombre: string, correo: string, contrasena: string) => boolean;
}
 
export const AuthContext = createContext<AuthContextType | null>(null);
 
export function Layout() {
  const [user, setUser] = useState<UserType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pendingRecipe, setPendingRecipe] = useState<RecipeType | null>(null);
 
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
 
  useEffect(() => {
    const stored = localStorage.getItem("cookly_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);
 
  useEffect(() => {
    const actualizar = () => {
      const stored = localStorage.getItem("cookly_user");
      if (stored) setUser(JSON.parse(stored));
      else setUser(null);
    };
    window.addEventListener("storage", actualizar);
    return () => window.removeEventListener("storage", actualizar);
  }, []);
 
  const openRegister = (recipe?: RecipeType) => {
    setNombre(""); setCorreo(""); setContrasena(""); setError("");
    setPendingRecipe(recipe ?? null);
    setShowModal(true);
  };
 
  const register = (n: string, c: string, p: string): boolean => {
    const usuarios: UserType[] = JSON.parse(localStorage.getItem("cookly_usuarios") || "[]");
    if (usuarios.find((u) => u.correo === c)) return false;
    const nuevo = { nombre: n, correo: c, contrasena: p };
    usuarios.push(nuevo);
    localStorage.setItem("cookly_usuarios", JSON.stringify(usuarios));
    localStorage.setItem("cookly_user", JSON.stringify(nuevo));
    setUser(nuevo);
    return true;
  };
 
  const logout = () => {
    localStorage.removeItem("cookly_user");
    localStorage.removeItem("favoritos"); // limpia favoritos al cerrar sesión
    window.dispatchEvent(new Event("storage"));
    setUser(null);
  };
 
  const validarCorreo = (c: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(c);
  };
 
  const validarContrasena = (p: string): boolean => {
    return p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p);
  };
 
  const handleSubmit = () => {
    setError("");
    if (!nombre.trim()) { setError("El nombre es obligatorio."); return; }
    if (!correo.trim()) { setError("El correo es obligatorio."); return; }
    if (!validarCorreo(correo)) { setError("Escribe un correo válido. Ejemplo: usuario@correo.com"); return; }
    if (!contrasena.trim()) { setError("La contraseña es obligatoria."); return; }
    if (!validarContrasena(contrasena)) {
      setError("La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número.");
      return;
    }
 
    const ok = register(nombre, correo, contrasena);
    if (!ok) { setError("Ese correo ya está registrado."); return; }
 
    if (pendingRecipe) {
      const favoritos: RecipeType[] = JSON.parse(localStorage.getItem("favoritos") || "[]");
      const yaExiste = favoritos.find((r) => r.id === pendingRecipe.id);
      if (!yaExiste) {
        favoritos.push(pendingRecipe);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        window.dispatchEvent(new Event("storage"));
      }
      setPendingRecipe(null);
    }
 
    setShowModal(false);
    setShowSuccess(true);
  };
 
  return (
    <AuthContext.Provider value={{ user, logout, openRegister, register }}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
 
      {/* MODAL REGISTRO */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-card rounded-2xl w-full max-w-md shadow-xl border border-border p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Crear cuenta</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-secondary rounded-xl transition">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
 
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                />
              </div>
 
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Correo electrónico</label>
                <input
                  type="email"
                  placeholder="usuario@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                />
                <p className="text-xs text-muted-foreground mt-1">Ejemplo: usuario@correo.com</p>
              </div>
 
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Mínimo 8 caracteres, una mayúscula, una minúscula y un número.
                </p>
              </div>
 
              {error && (
                <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>
              )}
 
              <button
                onClick={handleSubmit}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl hover:opacity-90 transition font-medium"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
 
      {/* VENTANA EMERGENTE DE ÉXITO */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full shadow-xl text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">¡Registro exitoso!</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Tu cuenta ha sido creada correctamente. ¡Bienvenido a Cookly!
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl hover:opacity-90 transition font-medium"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
 
    </AuthContext.Provider>
  );
}