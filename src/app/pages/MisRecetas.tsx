import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChefHat, Upload, Eye, EyeOff, Download, BookOpen, Camera, Save, ArrowLeft, CheckCircle, X } from "lucide-react";
import { AuthContext } from "../components/Layout";
import { supabase } from "../supabase";

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

  const handleSubmit = async () => {
    setError("");
    if (!correo || !contrasena) { setError("Correo y contraseña son obligatorios."); return; }
    if (modo === "registro") {
      if (!nombre) { setError("El nombre es obligatorio."); return; }
      const ok = await register(nombre, correo, contrasena);
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

// ── PÁGINA: MIS RECETAS — lee desde Supabase ───────────────
export function MisRecetas() {
  const [recetarios, setRecetarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      const { data, error } = await supabase
        .from("recetarios")
        .select("*")
        .order("id", { ascending: true });
      if (!error && data) setRecetarios(data);
      setLoading(false);
    };
    cargar();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-primary" />
          <h1 className="text-3xl">Recetarios</h1>
        </div>
        <p className="text-muted-foreground">Descarga recetarios para ocasiones especiales</p>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Cargando recetarios...</p>
      ) : recetarios.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No hay recetarios disponibles todavía.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {recetarios.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition">
              {/* IMAGEN DE PORTADA */}
              {item.imagen_url ? (
                <img
                  src={item.imagen_url}
                  alt={item.titulo}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-primary/40" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{item.titulo}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.descripcion}</p>
                <a
                  href={item.archivo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl hover:opacity-90 transition font-medium"
                >
                  <Download className="w-4 h-4" />
                  Descargar PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

// ── COMPRESIÓN DE FOTO ─────────────────────────────────────
function comprimirFoto(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = 200;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxSize) { height = (height * maxSize) / width; width = maxSize; }
        } else {
          if (height > maxSize) { width = (width * maxSize) / height; height = maxSize; }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
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

  const handleFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fotoComprimida = await comprimirFoto(file);
    setFoto(fotoComprimida);
  };

  const handleGuardar = async () => {
    setError("");
    if (!nombre.trim()) { setError("El nombre no puede estar vacío."); return; }
    try {
      const actualizacion: any = { nombre: nombre.trim() };
      if (foto) actualizacion.foto = foto;
      if (contrasena.trim()) actualizacion.contrasena = contrasena.trim();

      const { error: supaError } = await supabase
        .from("users")
        .update(actualizacion)
        .eq("correo", user.correo);

      if (supaError) { setError("No se pudo guardar. Intenta de nuevo."); return; }

      const userActualizado = { ...user, nombre: nombre.trim(), foto, ...(contrasena.trim() ? { contrasena: contrasena.trim() } : {}) };
      localStorage.setItem("cookly_user", JSON.stringify(userActualizado));
      window.dispatchEvent(new Event("storage"));

      setContrasena("");
      setShowExito(true);
    } catch (e) {
      setError("No se pudo guardar. Intenta con una foto más pequeña.");
    }
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
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 flex items-center justify-center bg-gradient-to-br from-primary to-accent">
              {foto ? <img src={foto} alt="perfil" className="w-full h-full object-cover" /> : <span className="text-white text-3xl font-semibold">{inicial}</span>}
            </div>
            <button onClick={() => fileRef.current?.click()} className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-md hover:opacity-90 transition">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-xs text-muted-foreground">Toca la cámara para cambiar tu foto</span>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFoto} />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Correo electrónico</label>
          <input type="email" value={user.correo} disabled className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondary text-sm text-muted-foreground cursor-not-allowed" />
          <p className="text-xs text-muted-foreground mt-1">El correo no se puede cambiar.</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition" />
        </div>
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

      {showExito && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full shadow-xl text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">¡Datos actualizados!</h3>
            <p className="text-muted-foreground text-sm mb-6">Tus cambios se guardaron correctamente.</p>
            <button onClick={() => setShowExito(false)} className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl hover:opacity-90 transition font-medium">
              Aceptar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}