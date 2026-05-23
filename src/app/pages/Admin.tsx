import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../supabase";
import { ChefHat, Plus, Pencil, Trash2, LogOut, X, Save, BookOpen, Upload, Youtube, Search, ImageIcon } from "lucide-react";

interface Recipe {
  id?: number;
  title: string;
  image: string;
  time: string;
  servings: number;
  category: string;
  difficulty: "Fácil" | "Media" | "Difícil";
  ingredients: string[];
  instructions: string[];
}

interface Recetario {
  id?: number;
  titulo: string;
  descripcion: string;
  archivo_url: string;
  imagen_url?: string;
}

interface Video {
  id?: number;
  titulo: string;
  canal: string;
  youtube_id: string;
}

const categorias = [
  "Desayunos y Brunch", "Almuerzos", "Meriendas", "Cenas Ligeras",
  "Entrantes", "Platos Principales", "Guarniciones", "Postres",
  "Vegetariano/Vegano", "Bajo en Carbohidratos", "Sin Gluten", "Saludable",
  "Express <20min", "Sin Horno", "Air Fryer", "Cocción lenta"
];

const recipeVacia: Recipe = {
  title: "", image: "", time: "", servings: 1,
  category: "Desayunos y Brunch", difficulty: "Fácil",
  ingredients: [""], instructions: [""]
};

export function Admin() {
  const navigate = useNavigate();

  const [seccion, setSeccion] = useState<"recetas" | "recetarios" | "videos">("recetas");

  // ── RECETAS ────────────────────────────────────────────
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe>(recipeVacia);
  const [isEditing, setIsEditing] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // ── RECETARIOS ─────────────────────────────────────────
  const [recetarios, setRecetarios] = useState<Recetario[]>([]);
  const [loadingRecetarios, setLoadingRecetarios] = useState(false);
  const [showFormRecetario, setShowFormRecetario] = useState(false);
  const [tituloRecetario, setTituloRecetario] = useState("");
  const [descripcionRecetario, setDescripcionRecetario] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [editingRecetario, setEditingRecetario] = useState<Recetario | null>(null);
  const [isEditingRecetario, setIsEditingRecetario] = useState(false);
  const [mensajeRecetario, setMensajeRecetario] = useState("");

  // ── VIDEOS ─────────────────────────────────────────────
  const [videos, setVideos] = useState<Video[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [showFormVideo, setShowFormVideo] = useState(false);
  const [tituloVideo, setTituloVideo] = useState("");
  const [canalVideo, setCanalVideo] = useState("");
  const [linkVideo, setLinkVideo] = useState("");
  const [mensajeVideo, setMensajeVideo] = useState("");

  useEffect(() => {
    const adminAuth = sessionStorage.getItem("cookly_admin");
    if (adminAuth !== "true") {
      navigate("/");
    } else {
      cargarRecetas();
      cargarRecetarios();
      cargarVideos();
    }
  }, []);

  const handleCerrarSesion = () => {
    sessionStorage.removeItem("cookly_admin");
    navigate("/");
  };

  // ── CRUD RECETAS ───────────────────────────────────────
  const cargarRecetas = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("recipes").select("*").order("id", { ascending: true });
    if (!error && data) setRecipes(data);
    setLoading(false);
  };

  const recetasFiltradas = recipes.filter((r) =>
    r.title.toLowerCase().includes(busqueda.toLowerCase()) ||
    r.category.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleGuardar = async () => {
    if (!editingRecipe.title.trim()) { setMensaje("El título es obligatorio."); return; }
    const receta = {
      ...editingRecipe,
      ingredients: editingRecipe.ingredients.filter(i => i.trim() !== ""),
      instructions: editingRecipe.instructions.filter(i => i.trim() !== ""),
    };
    if (isEditing && editingRecipe.id) {
      const { error } = await supabase.from("recipes").update(receta).eq("id", editingRecipe.id);
      if (error) { setMensaje("Error al actualizar."); return; }
      setMensaje("✓ Receta actualizada.");
    } else {
      const { id, ...sinId } = receta;
      const { error } = await supabase.from("recipes").insert([sinId]);
      if (error) { setMensaje("Error al guardar."); return; }
      setMensaje("✓ Receta agregada.");
    }
    setShowForm(false);
    setEditingRecipe(recipeVacia);
    setIsEditing(false);
    cargarRecetas();
    setTimeout(() => setMensaje(""), 3000);
  };

  const handleEliminar = async (id: number) => {
    if (!confirm("¿Eliminar esta receta?")) return;
    await supabase.from("recipes").delete().eq("id", id);
    setMensaje("✓ Receta eliminada.");
    cargarRecetas();
    setTimeout(() => setMensaje(""), 3000);
  };

  const handleEditar = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setIsEditing(true);
    setShowForm(true);
  };

  const updateIngrediente = (index: number, value: string) => { const arr = [...editingRecipe.ingredients]; arr[index] = value; setEditingRecipe({ ...editingRecipe, ingredients: arr }); };
  const addIngrediente = () => setEditingRecipe({ ...editingRecipe, ingredients: [...editingRecipe.ingredients, ""] });
  const removeIngrediente = (index: number) => setEditingRecipe({ ...editingRecipe, ingredients: editingRecipe.ingredients.filter((_, i) => i !== index) });
  const updateInstruccion = (index: number, value: string) => { const arr = [...editingRecipe.instructions]; arr[index] = value; setEditingRecipe({ ...editingRecipe, instructions: arr }); };
  const addInstruccion = () => setEditingRecipe({ ...editingRecipe, instructions: [...editingRecipe.instructions, ""] });
  const removeInstruccion = (index: number) => setEditingRecipe({ ...editingRecipe, instructions: editingRecipe.instructions.filter((_, i) => i !== index) });

  // ── CRUD RECETARIOS ────────────────────────────────────
  const cargarRecetarios = async () => {
    setLoadingRecetarios(true);
    const { data, error } = await supabase.from("recetarios").select("*").order("id", { ascending: true });
    if (!error && data) setRecetarios(data);
    setLoadingRecetarios(false);
  };

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImagenFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagenPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagenPreview(null);
    }
  };

  const handleSubirRecetario = async () => {
    if (!tituloRecetario.trim()) { setMensajeRecetario("El título es obligatorio."); return; }
    if (!pdfFile) { setMensajeRecetario("Selecciona un archivo PDF."); return; }
    setUploadingPdf(true);

    // Subir PDF
    const nombrePdf = `${Date.now()}_${pdfFile.name}`;
    const { error: uploadError } = await supabase.storage.from("recetarios").upload(nombrePdf, pdfFile, { contentType: "application/pdf" });
    if (uploadError) { setMensajeRecetario("Error al subir el PDF."); setUploadingPdf(false); return; }
    const { data: urlPdf } = supabase.storage.from("recetarios").getPublicUrl(nombrePdf);

    // Subir imagen si existe
    let imagenUrl = null;
    if (imagenFile) {
      const nombreImg = `img_${Date.now()}_${imagenFile.name}`;
      const { error: imgError } = await supabase.storage.from("recetarios").upload(nombreImg, imagenFile, { contentType: imagenFile.type });
      if (!imgError) {
        const { data: urlImg } = supabase.storage.from("recetarios").getPublicUrl(nombreImg);
        imagenUrl = urlImg.publicUrl;
      }
    }

    // Guardar en tabla
    const { error: dbError } = await supabase.from("recetarios").insert([{
      titulo: tituloRecetario.trim(),
      descripcion: descripcionRecetario.trim(),
      archivo_url: urlPdf.publicUrl,
      imagen_url: imagenUrl
    }]);

    if (dbError) { setMensajeRecetario("Error al guardar el recetario."); setUploadingPdf(false); return; }

    setMensajeRecetario("✓ Recetario subido correctamente.");
    setTituloRecetario(""); setDescripcionRecetario(""); setPdfFile(null); setImagenFile(null); setImagenPreview(null);
    setShowFormRecetario(false);
    cargarRecetarios();
    setUploadingPdf(false);
    setTimeout(() => setMensajeRecetario(""), 3000);
  };

  const handleEliminarRecetario = async (item: Recetario) => {
    if (!confirm("¿Eliminar este recetario?")) return;
    const nombreArchivo = item.archivo_url.split("/").pop();
    if (nombreArchivo) await supabase.storage.from("recetarios").remove([nombreArchivo]);
    if (item.imagen_url) {
      const nombreImg = item.imagen_url.split("/").pop();
      if (nombreImg) await supabase.storage.from("recetarios").remove([nombreImg]);
    }
    await supabase.from("recetarios").delete().eq("id", item.id);
    setMensajeRecetario("✓ Recetario eliminado.");
    cargarRecetarios();
    setTimeout(() => setMensajeRecetario(""), 3000);
  };

  const handleEditarRecetario = (item: Recetario) => {
    setTituloRecetario(item.titulo);
    setDescripcionRecetario(item.descripcion);
    setImagenPreview(item.imagen_url || null);
    setImagenFile(null);
    setPdfFile(null);
    setEditingRecetario(item);
    setIsEditingRecetario(true);
    setShowFormRecetario(true);
  };

  const handleGuardarEdicionRecetario = async () => {
    if (!editingRecetario) return;
    if (!tituloRecetario.trim()) { setMensajeRecetario("El título es obligatorio."); return; }
    setUploadingPdf(true);
    const actualizacion: any = { titulo: tituloRecetario.trim(), descripcion: descripcionRecetario.trim() };
    if (imagenFile) {
      const nombreImg = `img_${Date.now()}_${imagenFile.name}`;
      const { error: imgError } = await supabase.storage.from("recetarios").upload(nombreImg, imagenFile, { contentType: imagenFile.type });
      if (!imgError) {
        const { data: urlImg } = supabase.storage.from("recetarios").getPublicUrl(nombreImg);
        actualizacion.imagen_url = urlImg.publicUrl;
      }
    }
    if (pdfFile) {
      const nombrePdf = `${Date.now()}_${pdfFile.name}`;
      const { error: pdfError } = await supabase.storage.from("recetarios").upload(nombrePdf, pdfFile, { contentType: "application/pdf" });
      if (!pdfError) {
        const { data: urlPdf } = supabase.storage.from("recetarios").getPublicUrl(nombrePdf);
        actualizacion.archivo_url = urlPdf.publicUrl;
      }
    }
    await supabase.from("recetarios").update(actualizacion).eq("id", editingRecetario.id);
    setMensajeRecetario("✓ Recetario actualizado.");
    setTituloRecetario(""); setDescripcionRecetario(""); setPdfFile(null); setImagenFile(null); setImagenPreview(null);
    setEditingRecetario(null); setIsEditingRecetario(false); setShowFormRecetario(false);
    cargarRecetarios(); setUploadingPdf(false);
    setTimeout(() => setMensajeRecetario(""), 3000);
  };

  // ── CRUD VIDEOS ────────────────────────────────────────
  const cargarVideos = async () => {
    setLoadingVideos(true);
    const { data, error } = await supabase.from("videos").select("*").order("id", { ascending: true });
    if (!error && data) setVideos(data);
    setLoadingVideos(false);
  };

  const extraerYoutubeId = (link: string): string => {
    const match = link.match(/(?:v=|youtu\.be\/)([^&\?\/]+)/);
    return match ? match[1] : link;
  };

  const handleAgregarVideo = async () => {
    if (!tituloVideo.trim()) { setMensajeVideo("El título es obligatorio."); return; }
    if (!linkVideo.trim()) { setMensajeVideo("El link de YouTube es obligatorio."); return; }
    const youtubeId = extraerYoutubeId(linkVideo.trim());
    const { error } = await supabase.from("videos").insert([{ titulo: tituloVideo.trim(), canal: canalVideo.trim(), youtube_id: youtubeId }]);
    if (error) { setMensajeVideo("Error al guardar el video."); return; }
    setMensajeVideo("✓ Video agregado correctamente.");
    setTituloVideo(""); setCanalVideo(""); setLinkVideo(""); setShowFormVideo(false);
    cargarVideos();
    setTimeout(() => setMensajeVideo(""), 3000);
  };

  const handleEliminarVideo = async (id: number) => {
    if (!confirm("¿Eliminar este video?")) return;
    await supabase.from("videos").delete().eq("id", id);
    setMensajeVideo("✓ Video eliminado.");
    cargarVideos();
    setTimeout(() => setMensajeVideo(""), 3000);
  };

  return (
    <div style={{ backgroundColor: "#fefdfb" }} className="min-h-screen">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div style={{ background: "linear-gradient(135deg, #ff7f5c, #81c6c0)" }} className="text-white p-2 rounded-xl shadow-md">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <h1 style={{ background: "linear-gradient(to right, #ff7f5c, #81c6c0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }} className="font-semibold text-lg">Cookly Admin</h1>
            <p className="text-xs text-gray-400">Panel de administración</p>
          </div>
        </div>
        <button onClick={handleCerrarSesion} className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition">
          <LogOut className="w-4 h-4" /> Cerrar sesión
        </button>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 px-6">
        <div className="max-w-7xl mx-auto flex gap-6">
          {(["recetas", "recetarios", "videos"] as const).map((s) => (
            <button key={s} onClick={() => setSeccion(s)} className={`py-4 text-sm font-medium border-b-2 transition ${seccion === s ? "border-orange-400 text-orange-500" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
              {s === "recetas" ? "Recetas" : s === "recetarios" ? "Recetarios PDF" : "Videos"}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* ── SECCIÓN RECETAS ── */}
        {seccion === "recetas" && (
          <>
            {mensaje && <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${mensaje.startsWith("✓") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{mensaje}</div>}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold" style={{ color: "#2d3748" }}>Recetas ({recetasFiltradas.length})</h2>
              <button onClick={() => { setEditingRecipe(recipeVacia); setIsEditing(false); setShowForm(true); }} style={{ backgroundColor: "#ff7f5c" }} className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl hover:opacity-90 transition font-medium shadow-md">
                <Plus className="w-4 h-4" /> Agregar Receta
              </button>
            </div>
            <div className="relative mb-6">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Buscar receta por nombre o categoría..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white" />
              {busqueda && <button onClick={() => setBusqueda("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>}
            </div>
            {loading ? <p className="text-center text-gray-400 py-10">Cargando recetas...</p> : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recetasFiltradas.map((recipe) => (
                  <div key={recipe.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition">
                    {recipe.image && <img src={recipe.image} alt={recipe.title} className="w-full h-36 object-cover" />}
                    <div className="p-4">
                      <span style={{ color: "#ff7f5c" }} className="text-xs font-medium">{recipe.category}</span>
                      <h3 className="font-semibold mt-1 mb-1 text-sm" style={{ color: "#2d3748" }}>{recipe.title}</h3>
                      <p className="text-xs text-gray-400 mb-3">{recipe.time} · {recipe.servings} personas · {recipe.difficulty}</p>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditar(recipe)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs" style={{ backgroundColor: "#e8f4f8", color: "#81c6c0" }}><Pencil className="w-3 h-3" /> Editar</button>
                        <button onClick={() => handleEliminar(recipe.id!)} className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-400 py-1.5 rounded-lg text-xs hover:bg-red-100 transition"><Trash2 className="w-3 h-3" /> Eliminar</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!loading && recetasFiltradas.length === 0 && <p className="text-center text-gray-400 py-10">No hay recetas que coincidan con "{busqueda}"</p>}
          </>
        )}

        {/* ── SECCIÓN RECETARIOS ── */}
        {seccion === "recetarios" && (
          <>
            {mensajeRecetario && <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${mensajeRecetario.startsWith("✓") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{mensajeRecetario}</div>}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold" style={{ color: "#2d3748" }}>Recetarios PDF ({recetarios.length})</h2>
              <button onClick={() => { setTituloRecetario(""); setDescripcionRecetario(""); setPdfFile(null); setImagenFile(null); setImagenPreview(null); setIsEditingRecetario(false); setEditingRecetario(null); setShowFormRecetario(true); }} style={{ backgroundColor: "#ff7f5c" }} className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl hover:opacity-90 transition font-medium shadow-md">
                <Plus className="w-4 h-4" /> Subir Recetario PDF
              </button>
            </div>
            {loadingRecetarios ? <p className="text-center text-gray-400 py-10">Cargando...</p> : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recetarios.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition">
                    {/* Imagen de portada */}
                    {item.imagen_url ? (
                      <img src={item.imagen_url} alt={item.titulo} className="w-full h-40 object-cover" />
                    ) : (
                      <div className="w-full h-40 flex items-center justify-center" style={{ backgroundColor: "#fff0eb" }}>
                        <BookOpen className="w-12 h-12" style={{ color: "#ff7f5c", opacity: 0.4 }} />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-1" style={{ color: "#2d3748" }}>{item.titulo}</h3>
                      <p className="text-xs text-gray-400 mb-3">{item.descripcion}</p>
                      <div className="flex gap-2">
                        <a href={item.archivo_url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs" style={{ backgroundColor: "#e8f4f8", color: "#81c6c0" }}>Ver PDF</a>
                        <button onClick={() => handleEditarRecetario(item)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs" style={{ backgroundColor: "#e8f4f8", color: "#81c6c0" }}><Pencil className="w-3 h-3" /> Editar</button>
                        <button onClick={() => handleEliminarRecetario(item)} className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-400 py-1.5 rounded-lg text-xs hover:bg-red-100 transition"><Trash2 className="w-3 h-3" /> Eliminar</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {recetarios.length === 0 && !loadingRecetarios && (
              <div className="text-center py-20 text-gray-300"><BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>No hay recetarios. Sube el primero.</p></div>
            )}
          </>
        )}

        {/* ── SECCIÓN VIDEOS ── */}
        {seccion === "videos" && (
          <>
            {mensajeVideo && <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${mensajeVideo.startsWith("✓") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{mensajeVideo}</div>}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold" style={{ color: "#2d3748" }}>Videos ({videos.length})</h2>
              <button onClick={() => { setTituloVideo(""); setCanalVideo(""); setLinkVideo(""); setShowFormVideo(true); }} style={{ backgroundColor: "#ff7f5c" }} className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl hover:opacity-90 transition font-medium shadow-md">
                <Plus className="w-4 h-4" /> Agregar Video
              </button>
            </div>
            {loadingVideos ? <p className="text-center text-gray-400 py-10">Cargando...</p> : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <div key={video.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition">
                    <img src={`https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`} alt={video.titulo} className="w-full h-36 object-cover" />
                    <div className="p-4">
                      <span className="text-xs font-medium" style={{ color: "#ff7f5c" }}>{video.canal}</span>
                      <h3 className="font-semibold mt-1 mb-3 text-sm" style={{ color: "#2d3748" }}>{video.titulo}</h3>
                      <div className="flex gap-2">
                        <a href={`https://youtube.com/watch?v=${video.youtube_id}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs" style={{ backgroundColor: "#e8f4f8", color: "#81c6c0" }}>
                          <Youtube className="w-3 h-3" /> Ver en YouTube
                        </a>
                        <button onClick={() => handleEliminarVideo(video.id!)} className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-400 py-1.5 rounded-lg text-xs hover:bg-red-100 transition">
                          <Trash2 className="w-3 h-3" /> Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {videos.length === 0 && !loadingVideos && (
              <div className="text-center py-20 text-gray-300"><Youtube className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>No hay videos. Agrega el primero.</p></div>
            )}
          </>
        )}

      </main>

      {/* MODAL RECETA */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold" style={{ color: "#2d3748" }}>{isEditing ? "Editar Receta" : "Nueva Receta"}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-xl transition"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="text-sm text-gray-500 mb-1 block">Título *</label><input type="text" value={editingRecipe.title} onChange={(e) => setEditingRecipe({ ...editingRecipe, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none" placeholder="Nombre de la receta" /></div>
              <div><label className="text-sm text-gray-500 mb-1 block">URL de imagen</label><input type="text" value={editingRecipe.image} onChange={(e) => setEditingRecipe({ ...editingRecipe, image: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none" placeholder="https://..." />{editingRecipe.image && <img src={editingRecipe.image} alt="preview" className="mt-2 w-full h-32 object-cover rounded-xl" />}</div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm text-gray-500 mb-1 block">Tiempo</label><input type="text" value={editingRecipe.time} onChange={(e) => setEditingRecipe({ ...editingRecipe, time: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none" placeholder="30 min" /></div>
                <div><label className="text-sm text-gray-500 mb-1 block">Porciones</label><input type="number" value={editingRecipe.servings} onChange={(e) => setEditingRecipe({ ...editingRecipe, servings: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none" min={1} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm text-gray-500 mb-1 block">Categoría</label><select value={editingRecipe.category} onChange={(e) => setEditingRecipe({ ...editingRecipe, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none">{categorias.map((cat) => <option key={cat} value={cat}>{cat}</option>)}</select></div>
                <div><label className="text-sm text-gray-500 mb-1 block">Dificultad</label><select value={editingRecipe.difficulty} onChange={(e) => setEditingRecipe({ ...editingRecipe, difficulty: e.target.value as "Fácil" | "Media" | "Difícil" })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none"><option value="Fácil">Fácil</option><option value="Media">Media</option><option value="Difícil">Difícil</option></select></div>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-2 block">Ingredientes</label>
                <div className="space-y-2">{editingRecipe.ingredients.map((ing, i) => (<div key={i} className="flex gap-2"><input type="text" value={ing} onChange={(e) => updateIngrediente(i, e.target.value)} className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none" placeholder={`Ingrediente ${i + 1}`} /><button onClick={() => removeIngrediente(i)} className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition"><X className="w-4 h-4" /></button></div>))}</div>
                <button onClick={addIngrediente} style={{ color: "#ff7f5c" }} className="mt-2 text-sm hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Agregar ingrediente</button>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-2 block">Instrucciones</label>
                <div className="space-y-2">{editingRecipe.instructions.map((ins, i) => (<div key={i} className="flex gap-2"><textarea value={ins} onChange={(e) => updateInstruccion(i, e.target.value)} rows={2} className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none resize-none" placeholder={`Paso ${i + 1}`} /><button onClick={() => removeInstruccion(i)} className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition self-start"><X className="w-4 h-4" /></button></div>))}</div>
                <button onClick={addInstruccion} style={{ color: "#ff7f5c" }} className="mt-2 text-sm hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Agregar paso</button>
              </div>
              {mensaje && <p className={`text-sm px-3 py-2 rounded-lg ${mensaje.startsWith("✓") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{mensaje}</p>}
              <button onClick={handleGuardar} style={{ backgroundColor: "#ff7f5c" }} className="w-full flex items-center justify-center gap-2 text-white py-2.5 rounded-xl hover:opacity-90 transition font-medium"><Save className="w-4 h-4" />{isEditing ? "Guardar cambios" : "Agregar receta"}</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL RECETARIO PDF */}
      {showFormRecetario && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowFormRecetario(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold" style={{ color: "#2d3748" }}>{isEditingRecetario ? "Editar Recetario" : "Subir Recetario PDF"}</h2>
              <button onClick={() => { setShowFormRecetario(false); setIsEditingRecetario(false); setEditingRecetario(null); setImagenPreview(null); setTituloRecetario(""); setDescripcionRecetario(""); }} className="p-2 hover:bg-gray-100 rounded-xl transition"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="text-sm text-gray-500 mb-1 block">Título *</label><input type="text" value={tituloRecetario} onChange={(e) => setTituloRecetario(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none" placeholder="Ej: Recetario Navideño" /></div>
              <div><label className="text-sm text-gray-500 mb-1 block">Descripción</label><input type="text" value={descripcionRecetario} onChange={(e) => setDescripcionRecetario(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none" placeholder="Breve descripción" /></div>

              {/* Imagen de portada */}
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Imagen de portada</label>
                <label className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-4 cursor-pointer hover:border-orange-300 transition overflow-hidden">
                  {imagenPreview ? (
                    <img src={imagenPreview} alt="preview" className="w-full h-36 object-cover rounded-lg" />
                  ) : (
                    <>
                      <ImageIcon className="w-6 h-6 text-gray-300" />
                      <span className="text-sm text-gray-400">Haz clic para seleccionar una imagen</span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImagenChange} />
                </label>
              </div>

              {/* PDF */}
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Archivo PDF *</label>
                <label className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-6 cursor-pointer hover:border-orange-300 transition">
                  <Upload className="w-6 h-6 text-gray-300" />
                  <span className="text-sm text-gray-400">{pdfFile ? pdfFile.name : "Haz clic para seleccionar un PDF"}</span>
                  <input type="file" accept=".pdf" className="hidden" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} />
                </label>
              </div>

              {mensajeRecetario && <p className={`text-sm px-3 py-2 rounded-lg ${mensajeRecetario.startsWith("✓") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{mensajeRecetario}</p>}
              <button onClick={isEditingRecetario ? handleGuardarEdicionRecetario : handleSubirRecetario} disabled={uploadingPdf} style={{ backgroundColor: "#ff7f5c" }} className="w-full flex items-center justify-center gap-2 text-white py-2.5 rounded-xl hover:opacity-90 transition font-medium disabled:opacity-50">
                <Upload className="w-4 h-4" />{uploadingPdf ? "Guardando..." : isEditingRecetario ? "Guardar cambios" : "Subir Recetario"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL VIDEO */}
      {showFormVideo && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowFormVideo(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold" style={{ color: "#2d3748" }}>Agregar Video de YouTube</h2>
              <button onClick={() => setShowFormVideo(false)} className="p-2 hover:bg-gray-100 rounded-xl transition"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="text-sm text-gray-500 mb-1 block">Título *</label><input type="text" value={tituloVideo} onChange={(e) => setTituloVideo(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none" placeholder="Título del video" /></div>
              <div><label className="text-sm text-gray-500 mb-1 block">Canal</label><input type="text" value={canalVideo} onChange={(e) => setCanalVideo(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none" placeholder="Nombre del canal" /></div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Link de YouTube *</label>
                <input type="text" value={linkVideo} onChange={(e) => setLinkVideo(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none" placeholder="https://www.youtube.com/watch?v=..." />
                <p className="text-xs text-gray-400 mt-1">Pega el link completo del video de YouTube</p>
              </div>
              {linkVideo && extraerYoutubeId(linkVideo) && (
                <img src={`https://img.youtube.com/vi/${extraerYoutubeId(linkVideo)}/hqdefault.jpg`} alt="preview" className="w-full h-32 object-cover rounded-xl" />
              )}
              {mensajeVideo && <p className={`text-sm px-3 py-2 rounded-lg ${mensajeVideo.startsWith("✓") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{mensajeVideo}</p>}
              <button onClick={handleAgregarVideo} style={{ backgroundColor: "#ff7f5c" }} className="w-full flex items-center justify-center gap-2 text-white py-2.5 rounded-xl hover:opacity-90 transition font-medium">
                <Plus className="w-4 h-4" /> Agregar Video
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}