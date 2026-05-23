import { createContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { X, CheckCircle, Eye, EyeOff } from "lucide-react";
import { supabase } from "../supabase";

export interface UserType {
  id?: number;
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
  register: (nombre: string, correo: string, contrasena: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const ADMIN_EMAIL = "admin@cookly.com";
const ADMIN_PASSWORD = "Admin123";

export function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pendingRecipe, setPendingRecipe] = useState<RecipeType | null>(null);
  const [modo, setModo] = useState<"registro" | "login">("registro");

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [verContrasena, setVerContrasena] = useState(false);
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
    setVerContrasena(false);
    setModo("registro");
    setPendingRecipe(recipe ?? null);
    setShowModal(true);
  };

  const register = async (n: string, c: string, p: string): Promise<boolean> => {
    const { data: existente } = await supabase
      .from("users")
      .select("id")
      .eq("correo", c)
      .single();

    if (existente) return false;

    const { data, error } = await supabase
      .from("users")
      .insert([{ nombre: n, correo: c, contrasena: p }])
      .select()
      .single();

    if (error) return false;

    const nuevo = { id: data.id, nombre: n, correo: c, contrasena: p };
    localStorage.setItem("cookly_user", JSON.stringify(nuevo));
    setUser(nuevo);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("cookly_user");
    localStorage.removeItem("favoritos");
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

  const handleLogin = async () => {
    setError("");
    if (!correo.trim()) { setError("El correo es obligatorio."); return; }
    if (!contrasena.trim()) { setError("La contraseña es obligatoria."); return; }

    // Admin login
    if (correo === ADMIN_EMAIL && contrasena === ADMIN_PASSWORD) {
      sessionStorage.setItem("cookly_admin", "true");
      setShowModal(false);
      navigate("/admin");
      return;
    }

    // Buscar usuario en Supabase por correo y contraseña directamente
    const { data, error: err } = await supabase
      .from("users")
      .select("*")
      .eq("correo", correo)
      .eq("contrasena", contrasena)
      .single();

    if (err || !data) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    localStorage.setItem("cookly_user", JSON.stringify(data));
    setUser(data);
    window.dispatchEvent(new Event("storage"));
    setShowModal(false);
    setShowSuccess(true);
  };

  const handleRegistro = async () => {
    setError("");
    if (!nombre.trim()) { setError("El nombre es obligatorio."); return; }
    if (!correo.trim()) { setError("El correo es obligatorio."); return; }
    if (!validarCorreo(correo)) { setError("Escribe un correo válido. Ejemplo: usuario@correo.com"); return; }
    if (!contrasena.trim()) { setError("La contraseña es obligatoria."); return; }
    if (!validarContrasena(contrasena)) {
      setError("La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número.");
      return;
    }

    const ok = await register(nombre, correo, contrasena);
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

      {/* MODAL REGISTRO / LOGIN */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-card rounded-2xl w-full max-w-md shadow-xl border border-border p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">{modo === "registro" ? "Crear cuenta" : "Iniciar sesión"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-secondary rounded-xl transition">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex rounded-xl bg-secondary p-1 mb-6">
              <button
                onClick={() => { setModo("registro"); setError(""); setVerContrasena(false); }}
                className={`flex-1 py-2 rounded-lg text-sm transition ${modo === "registro" ? "bg-card shadow text-foreground" : "text-muted-foreground"}`}
              >
                Registrarse
              </button>
              <button
                onClick={() => { setModo("login"); setError(""); setVerContrasena(false); }}
                className={`flex-1 py-2 rounded-lg text-sm transition ${modo === "login" ? "bg-card shadow text-foreground" : "text-muted-foreground"}`}
              >
                Iniciar sesión
              </button>
            </div>

            <div className="space-y-4">
              {modo === "registro" && (
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
              )}

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Correo electrónico</label>
                <input
                  type="email"
                  placeholder="usuario@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Contraseña</label>
                <div className="relative">
                  <input
                    type={verContrasena ? "text" : "password"}
                    placeholder="••••••••"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (modo === "registro" ? handleRegistro() : handleLogin())}
                    className="w-full px-4 py-2.5 pr-10 rounded-xl border border-border bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setVerContrasena(!verContrasena)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  >
                    {verContrasena ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {modo === "registro" && (
                  <p className="text-xs text-muted-foreground mt-1">Mínimo 8 caracteres, una mayúscula, una minúscula y un número.</p>
                )}
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>
              )}

              <button
                onClick={modo === "registro" ? handleRegistro : handleLogin}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl hover:opacity-90 transition font-medium"
              >
                {modo === "registro" ? "Crear cuenta" : "Ingresar"}
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
            <h3 className="text-lg font-semibold mb-2">
              {modo === "registro" ? "¡Registro exitoso!" : "¡Bienvenido de nuevo!"}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              {modo === "registro" ? "Tu cuenta ha sido creada correctamente. ¡Bienvenido a Cookly!" : "Has iniciado sesión correctamente."}
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