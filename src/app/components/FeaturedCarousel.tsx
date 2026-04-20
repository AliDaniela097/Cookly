import Slider from "react-slick";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft } from "lucide-react";
 
interface FeaturedItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  tipo: "receta" | "salud";
}
 
const featuredItems: FeaturedItem[] = [
  {
    id: 1,
    title: "Bowl de Desayuno Nutritivo",
    subtitle: "Comienza tu día con energía y nutrientes esenciales",
    image: "https://images.unsplash.com/photo-1645517976245-569a91016f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tag: "Saludable", tipo: "receta"
  },
  {
    id: 2,
    title: "Tostadas de Aguacate",
    subtitle: "El brunch perfecto con grasas saludables",
    image: "https://images.unsplash.com/photo-1593903971086-da1ad90da20b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tag: "Trending", tipo: "receta"
  },
  {
    id: 3,
    title: "Smoothie Bowl Colorido",
    subtitle: "Vitaminas y antioxidantes en cada cucharada",
    image: "https://images.unsplash.com/photo-1625480499375-27220a672237?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tag: "Vegano", tipo: "receta"
  },
  {
    id: 4,
    title: "Recetas en Air Fryer",
    subtitle: "Cocina más rápido y saludable sin aceite",
    image: "https://images.unsplash.com/photo-1616401616927-3c81de22dfa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tag: "Express", tipo: "receta"
  },
  {
    id: 5,
    title: "Salud y Alimentación",
    subtitle: "Descubre consejos y noticias para una vida más saludable",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tag: "Salud", tipo: "salud"
  }
];
 
export function FeaturedCarousel() {
  const navigate = useNavigate();
 
  const handleClick = (item: FeaturedItem) => {
    if (item.tipo === "salud") {
      navigate("/salud");
    } else {
      const el = document.getElementById("categorias");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };
 
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800,
    arrows: false,
    dotsClass: "slick-dots carousel-dots",
    customPaging: () => <div className="dot-item" />
  };
 
  return (
    <div className="relative mb-10 rounded-2xl overflow-hidden shadow-lg">
      <Slider {...settings}>
        {featuredItems.map((item) => (
          <div key={item.id}>
            <div
              className="relative h-64 md:h-[420px] cursor-pointer"
              onClick={() => handleClick(item)}
            >
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {item.tag}
                </span>
                <h2 className="text-2xl md:text-4xl font-semibold text-white mb-2 leading-tight">
                  {item.title}
                </h2>
                <p className="text-sm md:text-base text-white/80 mb-3">{item.subtitle}</p>
                <span className="inline-flex items-center gap-1 text-xs text-white/60 border border-white/30 px-3 py-1 rounded-full">
                  {item.tipo === "salud" ? "Ver noticias →" : "Explorar categorías →"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
 
      <style>{`
        .carousel-dots {
          position: absolute;
          bottom: 16px;
          width: 100%;
          display: flex !important;
          justify-content: center;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .carousel-dots li { display: inline-block; margin: 0 3px; }
        .carousel-dots li .dot-item {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.3s;
        }
        .carousel-dots li.slick-active .dot-item {
          background: #ff7f5c; width: 24px; border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
 
// ── PÁGINA: SALUD Y ALIMENTACIÓN ──────────────────────────
const noticias = [
  {
    titulo: "Alimentos recomendados para la diabetes",
    descripcion: "Una dieta equilibrada con bajo índice glucémico ayuda a mantener estables los niveles de azúcar. Incluir vegetales, legumbres y granos enteros es clave.",
    imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    categoria: "Diabetes",
    link: "https://www.healthline.com/health/es/comida-para-diabeticos"
  },
  {
    titulo: "Comidas saludables para el corazón",
    descripcion: "El consumo regular de pescado azul, aceite de oliva, frutas y verduras reduce el riesgo de enfermedades cardiovasculares.",
    imagen: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    categoria: "Corazón",
    link: "https://www.mayoclinic.org/es/diseases-conditions/heart-disease/in-depth/heart-healthy-diet/art-20047702"
  },
  {
    titulo: "Qué comer para tener más energía",
    descripcion: "Los carbohidratos complejos, frutas frescas, frutos secos y proteínas magras mejoran el rendimiento físico y mental.",
    imagen: "https://images.unsplash.com/photo-1571748982800-fa51082c2224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    categoria: "Energía",
    link: "https://www.bupasalud.com/salud/alimentos-que-dan-energia"
  },
  {
    titulo: "Beneficios de una dieta vegetariana",
    descripcion: "Reducir el consumo de carne y aumentar el de vegetales puede disminuir el riesgo de obesidad e hipertensión.",
    imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    categoria: "Vegetariano",
    link: "https://fapap.es/articulo/404/dieta-vegetariana-beneficios-y-riesgos-nutricionales"
  },
  {
    titulo: "Hidratación y salud",
    descripcion: "Beber entre 1.5 y 2 litros de agua al día es fundamental para el correcto funcionamiento del organismo.",
    imagen: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    categoria: "Hidratación",
    link: "https://www.gob.mx/salud/articulos/la-importancia-de-una-buena-hidratacion"
  },
  {
    titulo: "Superalimentos que debes incluir",
    descripcion: "Quinoa, aguacate, arándanos, chía y jengibre son ricos en nutrientes esenciales y antioxidantes protectores.",
    imagen: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    categoria: "Superalimentos",
    link: "https://www-medicalnewstoday-com.translate.goog/articles/303079?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc"
  }
];
 
export function Salud() {
  const navigate = useNavigate();
 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
 
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition">
        <ArrowLeft className="w-4 h-4" />
        Volver
      </button>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Salud y Alimentación</h1>
        <p className="text-muted-foreground">Consejos y recomendaciones para una vida más saludable</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {noticias.map((item, index) => (
          <div key={index} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col">
            <img src={item.imagen} alt={item.titulo} className="w-full h-44 object-cover" />
            <div className="p-5 flex flex-col flex-1">
              <span className="text-xs text-primary font-medium">{item.categoria}</span>
              <h3 className="font-semibold mt-1 mb-2">{item.titulo}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.descripcion}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
              >
                Leer más →
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
 