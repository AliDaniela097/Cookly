import { useContext, useState, useRef, useEffect } from "react";
import { ChefHat, Search, Heart, BookOpen, LogOut, User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "./Layout";
 
export function Header() {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const user = ctx?.user ?? null;
  const logout = ctx?.logout ?? (() => {});
  const openRegister = ctx?.openRegister ?? (() => {});
 
  const [menuOpen, setMenuOpen] = useState(false);       // menú de usuario (avatar)
  const [mobileOpen, setMobileOpen] = useState(false);   // menú hamburguesa móvil
  const [searchValue, setSearchValue] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
 
  // Cierra el menú móvil al navegar
  const handleNav = (path: string) => {
    setMobileOpen(false);
    navigate(path);
  };
 
  const handleSearch = () => {
    const value = searchValue.trim();
    navigate(value ? `/buscar?q=${encodeURIComponent(value)}` : "/buscar");
    setSearchValue("");
    setMobileOpen(false);
  };
 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };
 
  const handleFavoritos = () => {
    setMobileOpen(false);
    if (!user) { openRegister(); } else { navigate("/favoritos"); }
  };
 
  const inicial = user?.nombre?.charAt(0).toUpperCase() ?? "";
  const foto = user?.foto;
 
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
 
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <div className="bg-gradient-to-br from-primary to-accent text-white p-2.5 rounded-xl shadow-md">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Cookly
              </h1>
              <p className="text-xs text-muted-foreground">Tu libro de recetas</p>
            </div>
          </Link>
 
          {/* DESKTOP: elementos del lado derecho */}
          <div className="hidden md:flex items-center gap-4">
 
            {/* Buscador */}
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Buscar recetas..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 pr-10 py-2.5 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 w-64 lg:w-80 transition-all"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <button onClick={handleSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition">
                <Search className="w-4 h-4" />
              </button>
            </div>
 
            {/* Corazón */}
            <button onClick={handleFavoritos} className="p-2.5 hover:bg-secondary rounded-xl transition-colors" title="Favoritos">
              <Heart className="w-5 h-5 text-foreground" />
            </button>
 
            {/* Usuario */}
            {user ? (
              <div className="relative" ref={menuRef}>
                <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 hover:bg-secondary px-3 py-2 rounded-xl transition">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/30 flex items-center justify-center bg-gradient-to-br from-primary to-accent flex-shrink-0">
                    {foto ? <img src={foto} alt={user.nombre} className="w-full h-full object-cover" /> : <span className="text-white text-sm font-semibold">{inicial}</span>}
                  </div>
                  <span className="text-sm font-medium">{user.nombre}</span>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50">
                    <button onClick={() => { setMenuOpen(false); navigate("/perfil"); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-secondary transition text-left">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Mi perfil
                    </button>
                    <div className="h-px bg-border mx-3" />
                    <button onClick={() => { setMenuOpen(false); logout(); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-secondary transition text-left text-destructive">
                      <LogOut className="w-4 h-4" />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => openRegister()} className="flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-xl hover:bg-primary/10 transition text-sm">
                Registrarse
              </button>
            )}
 
            {/* Botón Recetas */}
            <Link to="/mis-recetas" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-md">
              <BookOpen className="w-4 h-4" />
              <span>Recetas</span>
            </Link>
 
          </div>
 
          {/* MÓVIL: botón hamburguesa */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 hover:bg-secondary rounded-xl transition"
            aria-label="Menú"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
 
        </div>
      </div>
 
      {/* MENÚ MÓVIL desplegable */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-4 space-y-3">
 
          {/* Buscador móvil */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar recetas o ingredientes..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
 
          {/* Links de navegación */}
          <button onClick={() => handleNav("/")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition text-left text-sm">
            <ChefHat className="w-4 h-4 text-primary" />
            Inicio
          </button>
 
          <button onClick={handleFavoritos} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition text-left text-sm">
            <Heart className="w-4 h-4 text-primary" />
            Favoritos
          </button>
 
          <button onClick={() => handleNav("/buscar")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition text-left text-sm">
            <Search className="w-4 h-4 text-primary" />
            Buscar Recetas
          </button>
 
          <button onClick={() => handleNav("/mis-recetas")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition text-left text-sm">
            <BookOpen className="w-4 h-4 text-primary" />
            Recetas Descargables
          </button>
 
          <button onClick={() => handleNav("/salud")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition text-left text-sm">
            <Heart className="w-4 h-4 text-primary" />
            Salud y Alimentación
          </button>
 
          <div className="h-px bg-border" />
 
          {/* Usuario en móvil */}
          {user ? (
            <>
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/30 flex items-center justify-center bg-gradient-to-br from-primary to-accent flex-shrink-0">
                  {foto ? <img src={foto} alt={user.nombre} className="w-full h-full object-cover" /> : <span className="text-white text-sm font-semibold">{inicial}</span>}
                </div>
                <span className="text-sm font-medium">{user.nombre}</span>
              </div>
              <button onClick={() => handleNav("/perfil")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition text-left text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                Mi perfil
              </button>
              <button onClick={() => { setMobileOpen(false); logout(); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition text-left text-sm text-destructive">
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </>
          ) : (
            <button onClick={() => { setMobileOpen(false); openRegister(); }} className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl hover:opacity-90 transition text-sm font-medium">
              Registrarse
            </button>
          )}
 
        </div>
      )}
    </header>
  );
}
 