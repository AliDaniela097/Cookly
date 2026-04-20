import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { ChefHat, Upload, Eye, EyeOff, Download, BookOpen, Camera, Save, ArrowLeft, CheckCircle, X } from "lucide-react";
import { AuthContext } from "../components/Layout";
 
// ── PÁGINA: AUTH ───────────────────────────────────────────
export function Auth() {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const register = ctx?.register ?? (() => false);
 
  const [modo, setModo] = useState<"login" | "registro">("login");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [verContrasena, setVerContrasena] = useState(false);
  const [error, setError] = useState("");
 
  const handleSubmit = () => {
    setError("");
    if (!correo || !contrasena) { setError("Correo y contraseña son obligatorios."); return; }
    if (modo === "registro") {
      if (!nombre) { setError("El nombre es obligatorio."); return; }
      const ok = register(nombre, correo, contrasena);
      if (!ok) { setError("Ese correo ya está registrado."); return; }
    }
    navigate("/");
  };
 
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-br from-primary to-accent text-white p-3 rounded-2xl shadow-lg mb-3">
            <ChefHat className="w-8 h-8" />
          </div>
          <h1 className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Cookly</h1>
          <p className="text-muted-foreground text-sm mt-1">Tu libro de recetas</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="flex rounded-xl bg-secondary p-1 mb-6">
            <button onClick={() => { setModo("login"); setError(""); }} className={`flex-1 py-2 rounded-lg text-sm transition ${modo === "login" ? "bg-card shadow text-foreground" : "text-muted-foreground"}`}>Iniciar sesión</button>
            <button onClick={() => { setModo("registro"); setError(""); }} className={`flex-1 py-2 rounded-lg text-sm transition ${modo === "registro" ? "bg-card shadow text-foreground" : "text-muted-foreground"}`}>Registrarse</button>
          </div>
          <div className="space-y-4">
            {modo === "registro" && (
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Nombre</label>
                <input type="text" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition" />
              </div>
            )}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Correo electrónico</label>
              <input type="email" placeholder="tu@correo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Contraseña</label>
              <div className="relative">
                <input type={verContrasena ? "text" : "password"} placeholder="••••••••" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="w-full px-4 py-2.5 pr-10 rounded-xl border border-border bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition" />
                <button type="button" onClick={() => setVerContrasena(!verContrasena)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {verContrasena ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>}
            <button onClick={handleSubmit} className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl hover:opacity-90 transition font-medium">
              {modo === "login" ? "Iniciar sesión" : "Crear cuenta"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
// ── PÁGINA: MIS RECETAS ────────────────────────────────────
const recetarios = [
  {
    titulo: "Recetario Día de Muertos",
    descripcion: "Comidas tradicionales para esta celebración especial",
    archivo: "https://drive.google.com/uc?export=download&id=14TEb6n3cO0x47sIjdYnuwxMf5gT7M2FF",
   
  }
  ,{
    titulo: "Comida con menos de 10$",
    descripcion: "Prepara tu comida economicamente",
    archivo: "https://drive.google.com/uc?export=download&id=1l7SfZb-t2J-X2I39hMaQgziACQoPyc3L"
  }
];
 
export function MisRecetas() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-primary" />
          <h1 className="text-3xl">Recetarios</h1>
        </div>
        <p className="text-muted-foreground">Descarga recetarios para ocasiones especiales</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {recetarios.map((item, index) => (
          <div key={index} className="bg-card border border-border rounded-2xl shadow-sm p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">{item.titulo}</h3>
            <p className="text-sm text-muted-foreground mb-4">{item.descripcion}</p>
            <a
              href={item.archivo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition"
            >
              <Download className="w-4 h-4" />
              Descargar PDF
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
 
// ── PÁGINA: PERFIL ─────────────────────────────────────────
export function Perfil() {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const user = ctx?.user ?? null;
 
  const [nombre, setNombre] = useState(user?.nombre ?? "");
  const [contrasena, setContrasena] = useState("");
  const [foto, setFoto] = useState<string | undefined>(user?.foto ?? undefined);
  const [error, setError] = useState("");
  const [showExito, setShowExito] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
 
  if (!user) {
    navigate("/");
    return null;
  }
 
  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFoto(reader.result as string);
    reader.readAsDataURL(file);
  };
 
  const handleGuardar = () => {
    setError("");
    if (!nombre.trim()) { setError("El nombre no puede estar vacío."); return; }
 
    const usuarios = JSON.parse(localStorage.getItem("cookly_usuarios") || "[]");
    const index = usuarios.findIndex((u: any) => u.correo === user.correo);
    if (index !== -1) {
      usuarios[index].nombre = nombre.trim();
      if (foto) usuarios[index].foto = foto;
      if (contrasena.trim()) usuarios[index].contrasena = contrasena.trim();
      localStorage.setItem("cookly_usuarios", JSON.stringify(usuarios));
    }
 
    const userActualizado = { ...user, nombre: nombre.trim(), foto, ...(contrasena.trim() ? { contrasena: contrasena.trim() } : {}) };
    localStorage.setItem("cookly_user", JSON.stringify(userActualizado));
    window.dispatchEvent(new Event("storage"));
 
    setContrasena("");
    setShowExito(true);
  };
 
  const inicial = nombre?.charAt(0).toUpperCase() ?? "";
 
  return (
    <main className="max-w-lg mx-auto px-4 py-10">
 
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition">
        <ArrowLeft className="w-4 h-4" />
        Volver
      </button>
 
      <h1 className="text-2xl font-semibold mb-8">Mi Perfil</h1>
 
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-6">
 
        {/* Foto */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 flex items-center justify-center bg-gradient-to-br from-primary to-accent">
              {foto
                ? <img src={foto} alt="perfil" className="w-full h-full object-cover" />
                : <span className="text-white text-3xl font-semibold">{inicial}</span>
              }
            </div>
            <button onClick={() => fileRef.current?.click()} className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-md hover:opacity-90 transition">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-xs text-muted-foreground">Toca la cámara para cambiar tu foto</span>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFoto} />
        </div>
 
        {/* Correo solo lectura */}
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Correo electrónico</label>
          <input type="email" value={user.correo} disabled className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondary text-sm text-muted-foreground cursor-not-allowed" />
          <p className="text-xs text-muted-foreground mt-1">El correo no se puede cambiar.</p>
        </div>
 
        {/* Nombre */}
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition" />
        </div>
 
        {/* Contraseña */}
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Nueva contraseña</label>
          <input type="password" placeholder="Déjalo vacío para no cambiarla" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition" />
        </div>
 
        {error && <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>}
 
        <button onClick={handleGuardar} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl hover:opacity-90 transition font-medium">
          <Save className="w-4 h-4" />
          Guardar cambios
        </button>
 
      </div>
 
      {/* VENTANA EMERGENTE DE ÉXITO */}
      {showExito && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full shadow-xl text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">¡Datos actualizados!</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Tus cambios se guardaron correctamente.
            </p>
            <button
              onClick={() => setShowExito(false)}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl hover:opacity-90 transition font-medium"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
 
    </main>
  );
}
 