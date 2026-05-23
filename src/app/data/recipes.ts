export interface Recipe {
  id: number;
  title: string;
  image: string;
  time: string;
  servings: number;
  category: string;
  difficulty: "Fácil" | "Media" | "Difícil";
  ingredients: string[];
  instructions: string[];
}
 
export const recipes: Recipe[] = [
 
  // ── DESAYUNOS Y BRUNCH ──────────────────────────────────
  {
    id: 1,
    title: "Tostadas de Aguacate con Huevo Pochado",
    image: "https://images.unsplash.com/photo-1593903971086-da1ad90da20b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    time: "15 min", servings: 2, category: "Desayunos y Brunch", difficulty: "Fácil",
    ingredients: ["2 rebanadas de pan integral", "1 aguacate maduro", "2 huevos", "jugo de limón", "sal", "pimienta", "semillas de sésamo"],
    instructions: ["Tostar el pan.", "Machacar el aguacate con limón, sal y pimienta.", "Pochar los huevos 3-4 min.", "Untar aguacate y colocar el huevo encima.", "Espolvorear sésamo y servir."]
  },
  {
    id: 2,
    title: "Bowl de Desayuno Energético",
    image: "https://images.unsplash.com/photo-1645517976245-569a91016f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    time: "10 min", servings: 1, category: "Desayunos y Brunch", difficulty: "Fácil",
    ingredients: ["yogur griego", "granola", "plátano", "fresas", "arándanos", "miel"],
    instructions: ["Colocar yogur en bowl.", "Agregar granola.", "Decorar con frutas.", "Rociar con miel."]
  },
  {
    id: 101,
    title: "Tigrillo Ecuatoriano",
    image: "https://i.pinimg.com/736x/83/3c/a6/833ca6595e2ed6eda2512298b6166bbf.jpg",
    time: "25 min", servings: 2, category: "Desayunos y Brunch", difficulty: "Fácil",
    ingredients: ["2 plátanos verdes", "2 huevos", "queso fresco", "mantequilla", "sal", "cebolla larga", "chicharrón"],
    instructions: ["Cocinar los plátanos verdes y machacarlos.", "Freír con mantequilla.", "Agregar los huevos y revolver.", "Incorporar queso y chicharrón.", "Sazonar y servir con cebolla larga."]
  },
  {
    id: 102,
    title: "Mote Pillo",
    image: "https://i.pinimg.com/1200x/a7/4f/b6/a74fb653730af00754ddec8d87581625.jpg",
    time: "20 min", servings: 4, category: "Desayunos y Brunch", difficulty: "Fácil",
    ingredients: ["2 tazas de mote cocido", "4 huevos", "leche", "cebolla larga", "mantequilla", "sal", "cilantro"],
    instructions: ["Sofreír cebolla en mantequilla.", "Agregar mote y saltear.", "Batir huevos con leche.", "Verter sobre el mote y revolver.", "Decorar con cilantro."]
  },
  {
    id: 103,
    title: "Colada Morada",
    image: "https://i.pinimg.com/736x/91/85/76/9185760de6964fadfc3086b0aee4cb68.jpg",
    time: "40 min", servings: 6, category: "Desayunos y Brunch", difficulty: "Media",
    ingredients: ["harina de maíz morado", "mora", "naranjilla", "babaco", "piña", "canela", "clavo de olor", "panela", "hierbas aromáticas"],
    instructions: ["Cocinar frutas con canela y clavo.", "Disolver harina de maíz en agua fría.", "Agregar al jugo de frutas colado.", "Cocinar hasta espesar removiendo.", "Endulzar con panela.", "Servir caliente con pan de guagua."]
  },
  {
    id: 104,
    title: "Humitas de Choclo",
    image: "https://i.pinimg.com/736x/3e/0f/0d/3e0f0d3582742d9566de2298767de26d.jpg",
    time: "60 min", servings: 8, category: "Desayunos y Brunch", difficulty: "Difícil",
    ingredients: ["choclo tierno molido", "queso fresco", "mantequilla", "huevos", "polvo de hornear", "hojas de choclo", "sal"],
    instructions: ["Moler el choclo tierno.", "Mezclar con queso, mantequilla y huevos.", "Agregar polvo de hornear.", "Rellenar hojas de choclo.", "Amarrar y cocinar al vapor 30 min.", "Servir calientes."]
  },
  {
    id: 105,
    title: "Pancakes de Avena con Arándanos",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    time: "20 min", servings: 2, category: "Desayunos y Brunch", difficulty: "Fácil",
    ingredients: ["1 taza de avena molida", "1 huevo", "leche", "polvo de hornear", "arándanos frescos", "miel"],
    instructions: ["Mezclar avena, huevo, leche y polvo de hornear.", "Calentar sartén.", "Cocinar 2-3 min por lado.", "Servir con miel."]
  },
  {
    id: 106,
    title: "Bolón de Verde con Queso",
    image: "https://i.pinimg.com/1200x/dc/a4/0d/dca40de1e005c19b47267d3b27bde339.jpg",
    time: "30 min", servings: 4, category: "Desayunos y Brunch", difficulty: "Media",
    ingredients: ["4 plátanos verdes", "queso fresco desmenuzado", "sal", "aceite para freír"],
    instructions: ["Cocinar los plátanos verdes.", "Machacar con sal.", "Rellenar con queso y formar bolas.", "Freír en aceite caliente hasta dorar.", "Servir caliente."]
  },
 
  // ── ALMUERZOS ───────────────────────────────────────────
  {
    id: 14,
    title: "Encebollado Ecuatoriano",
    image: "https://i.pinimg.com/1200x/80/48/31/804831914e3a4582137615433a2152a7.jpg",
    time: "60 min", servings: 4, category: "Almuerzos", difficulty: "Media",
    ingredients: ["500g de albacora", "yuca cocida", "cebolla morada", "tomate", "cilantro", "limón", "comino", "achiote"],
    instructions: ["Cocinar el pescado con especias.", "Agregar yuca.", "Preparar curtido de cebolla.", "Servir caliente con chifles y canguil."]
  },
  {
    id: 201,
    title: "Arroz con Menestra y Carne",
    image: "https://i.pinimg.com/1200x/95/1b/78/951b7896f1b8a554d0b124baabe7ba5b.jpg",
    time: "50 min", servings: 4, category: "Almuerzos", difficulty: "Media",
    ingredients: ["arroz", "lentejas", "carne de res", "cebolla", "tomate", "pimiento", "ajo", "achiote", "cilantro"],
    instructions: ["Cocinar el arroz.", "Preparar menestra con lentejas y refrito.", "Asar la carne sazonada.", "Servir los tres juntos.", "Acompañar con ensalada."]
  },
  {
    id: 202,
    title: "Seco de Pollo Ecuatoriano",
    image: "https://i.pinimg.com/1200x/37/1b/89/371b89640d56b1dbf18af03572551624.jpg",
    time: "50 min", servings: 4, category: "Almuerzos", difficulty: "Media",
    ingredients: ["1 pollo en presas", "cerveza", "naranjilla", "cebolla", "pimiento", "ajo", "cilantro", "achiote", "comino"],
    instructions: ["Marinar el pollo con especias.", "Sofreír cebolla y pimiento con achiote.", "Agregar pollo y dorar.", "Añadir cerveza y naranjilla.", "Cocinar 30 min.", "Servir con arroz."]
  },
  {
    id: 203,
    title: "Guatita Ecuatoriana",
    image: "https://i.pinimg.com/1200x/2f/3e/94/2f3e94667fad5042713a3ca8cdd881b9.jpg",
    time: "120 min", servings: 6, category: "Almuerzos", difficulty: "Difícil",
    ingredients: ["1kg de librillo (mondongo)", "papa", "maní tostado molido", "leche", "cebolla", "ajo", "achiote", "cilantro"],
    instructions: ["Limpiar y cocinar el mondongo 1 hora.", "Cortar en trozos.", "Preparar salsa de maní con leche.", "Sofreír cebolla con achiote.", "Agregar mondongo y papas a la salsa.", "Cocinar 20 min y servir con arroz."]
  },
  {
    id: 204,
    title: "Caldo de Gallina Criolla",
    image: "https://i.pinimg.com/1200x/6d/64/9e/6d649e7eb07c9e2c4d900b1982659059.jpg",
    time: "120 min", servings: 6, category: "Almuerzos", difficulty: "Media",
    ingredients: ["1 gallina criolla", "papa", "zanahoria", "apio", "cebolla larga", "cilantro", "ajo", "comino"],
    instructions: ["Limpiar la gallina y cortar en presas.", "Cocinar en agua con cebolla y ajo.", "Agregar papa y zanahoria.", "Rectificar sazón.", "Servir con arroz y cilantro."]
  },
  {
    id: 205,
    title: "Caldo de Patas",
    image: "https://i.pinimg.com/736x/32/11/1f/32111f200873f11d84bdb343d41fe3b9.jpg",
    time: "180 min", servings: 6, category: "Almuerzos", difficulty: "Difícil",
    ingredients: ["patas de res", "maíz blanco", "maní", "leche", "cebolla", "ajo", "orégano", "comino", "cilantro"],
    instructions: ["Limpiar y cocinar las patas 2-3 horas.", "Agregar maíz a la cocción.", "Preparar refrito con cebolla y especias.", "Añadir maní molido con leche.", "Cocinar 20 min más.", "Servir caliente con cilantro y canguil."]
  },
  {
    id: 206,
    title: "Sancocho Ecuatoriano",
    image: "https://i.pinimg.com/1200x/7d/c5/b1/7dc5b179f95aa7aed1dfdd22ce334eae.jpg",
    time: "75 min", servings: 6, category: "Almuerzos", difficulty: "Media",
    ingredients: ["carne de res", "yuca", "plátano verde", "choclo", "papa", "zanahoria", "cebolla", "cilantro", "ajo", "comino"],
    instructions: ["Cocinar la carne en agua con ajo.", "Agregar choclo y zanahoria.", "Añadir yuca, verde y papa.", "Cocinar hasta que todo esté tierno.", "Decorar con cilantro.", "Servir con arroz y curtido."]
  },
  {
    id: 207,
    title: "Yaguarlocro",
    image: "https://i.pinimg.com/1200x/1c/0a/b7/1c0ab72127161113a8756dfd24e6e28b.jpg",
    time: "90 min", servings: 6, category: "Almuerzos", difficulty: "Difícil",
    ingredients: ["vísceras de borrego", "papa chola", "maní molido", "leche", "sangre cocida", "cebolla", "ajo", "achiote", "cilantro"],
    instructions: ["Cocinar las vísceras hasta tiernas.", "Preparar base con cebolla y achiote.", "Agregar papas y caldo.", "Incorporar maní con leche.", "Añadir vísceras trozadas.", "Servir con sangre frita y aguacate."]
  },
  {
    id: 208,
    title: "Sopa de Morocho",
    image: "https://i.pinimg.com/1200x/39/bc/24/39bc24b529b2f2d30195198718692678.jpg",
    time: "60 min", servings: 6, category: "Almuerzos", difficulty: "Fácil",
    ingredients: ["morocho partido", "leche", "pollo", "papa", "cebolla", "ajo", "cilantro", "sal"],
    instructions: ["Remojar el morocho 8 horas.", "Cocinar con caldo de pollo.", "Agregar papa y pollo desmenuzado.", "Incorporar leche al final.", "Decorar con cilantro."]
  },
 
  // ── MERIENDAS ────────────────────────────────────────────
  {
    id: 301,
    title: "Chifles con Sal",
    image: "https://i.pinimg.com/736x/0c/56/7f/0c567f9163a751fa63d1fa19ed90f063.jpg",
    time: "15 min", servings: 4, category: "Meriendas", difficulty: "Fácil",
    ingredients: ["3 plátanos verdes", "aceite para freír", "sal"],
    instructions: ["Pelar y cortar en rodajas finas.", "Freír en aceite caliente.", "Escurrir y salar.", "Servir crujientes."]
  },
  {
    id: 302,
    title: "Tostado Ecuatoriano",
    image: "https://i.pinimg.com/736x/48/b4/1b/48b41b1dc00ea6a2c5d633e2d81cd88a.jpg",
    time: "15 min", servings: 4, category: "Meriendas", difficulty: "Fácil",
    ingredients: ["2 tazas de maíz seco", "sal", "aceite", "ajo en polvo"],
    instructions: ["Calentar sartén con aceite.", "Agregar maíz y tostar.", "Remover constantemente.", "Sazonar con sal y ajo.", "Servir crujiente."]
  },
  {
    id: 303,
    title: "Empanadas de Viento",
    image: "https://i.pinimg.com/1200x/5c/6f/e1/5c6fe17c6a617ad4688ef13e70dcd5e5.jpg",
    time: "45 min", servings: 8, category: "Meriendas", difficulty: "Media",
    ingredients: ["harina", "mantequilla", "queso fresco", "aceite para freír", "azúcar en polvo"],
    instructions: ["Preparar masa con harina y mantequilla.", "Rellenar con queso.", "Cerrar y sellar.", "Freír en aceite caliente.", "Espolvorear azúcar y servir."]
  },
  {
    id: 304,
    title: "Ají Criollo de Tomate de Árbol",
    image: "https://i.pinimg.com/736x/ea/fe/17/eafe17cc16daf9090a9cb91dba0d21ec.jpg",
    time: "10 min", servings: 6, category: "Meriendas", difficulty: "Fácil",
    ingredients: ["4 tomates de árbol", "2 ajíes", "cebolla larga", "cilantro", "sal", "limón"],
    instructions: ["Asar los tomates de árbol.", "Licuar con ají.", "Picar cebolla y cilantro.", "Mezclar todo.", "Sazonar con sal y limón."]
  },
  {
    id: 305,
    title: "Canguil Ecuatoriano",
    image: "https://i.pinimg.com/736x/d7/be/ed/d7beed529a08cdafc2a4ed6922cc4ea3.jpg",
    time: "10 min", servings: 4, category: "Meriendas", difficulty: "Fácil",
    ingredients: ["maíz para canguil", "aceite", "sal", "mantequilla"],
    instructions: ["Calentar aceite en olla.", "Agregar maíz y tapar.", "Agitar mientras revienta.", "Sazonar con sal y mantequilla."]
  },
  {
    id: 306,
    title: "Espumillas de Guayaba",
    image: "https://i.pinimg.com/1200x/30/68/65/306865ae7ed9d7b68fd6944367c0e1d6.jpg",
    time: "20 min", servings: 6, category: "Meriendas", difficulty: "Media",
    ingredients: ["claras de huevo", "guayaba madura", "azúcar", "limón"],
    instructions: ["Batir claras a punto de nieve.", "Preparar pulpa de guayaba.", "Incorporar azúcar y guayaba.", "Batir hasta textura espesa.", "Servir en conos de papel."]
  },
  {
    id: 307,
    title: "Muffins de Plátano Maduro",
    image: "https://i.pinimg.com/736x/7b/8c/9a/7b8c9acf04806d1aa06087e6a822b861.jpg",
    time: "35 min", servings: 6, category: "Meriendas", difficulty: "Fácil",
    ingredients: ["3 plátanos maduros", "2 huevos", "avena", "canela", "nueces"],
    instructions: ["Machacar los plátanos.", "Mezclar con huevos, avena y canela.", "Agregar nueces.", "Hornear 20-25 min a 180°C."]
  },
 
  // ── CENAS LIGERAS ────────────────────────────────────────
  {
    id: 401,
    title: "Tortilla de Verde",
    image: "https://i.pinimg.com/736x/25/3e/05/253e05a04c461e477d310f210e326594.jpg",
    time: "20 min", servings: 2, category: "Cenas Ligeras", difficulty: "Fácil",
    ingredients: ["2 plátanos verdes rallados", "2 huevos", "queso fresco", "sal", "aceite"],
    instructions: ["Rallar el plátano verde.", "Mezclar con huevo y queso.", "Sazonar con sal.", "Freír en sartén hasta dorar.", "Servir caliente."]
  },
  {
    id: 402,
    title: "Crema de Zapallo",
    image: "https://i.pinimg.com/1200x/53/48/df/5348dff9300a26452d74bf644788d536.jpg",
    time: "30 min", servings: 4, category: "Cenas Ligeras", difficulty: "Fácil",
    ingredients: ["1kg de zapallo", "cebolla", "ajo", "caldo de verduras", "leche", "nuez moscada"],
    instructions: ["Sofreír cebolla y ajo.", "Agregar zapallo troceado.", "Añadir caldo y cocinar 20 min.", "Licuar con leche.", "Sazonar y servir."]
  },
  {
    id: 403,
    title: "Sopa de Arroz de Cebada",
    image: "https://i.pinimg.com/1200x/54/37/6c/54376c690719d6e12eff13a4df4e0d30.jpg",
    time: "50 min", servings: 6, category: "Cenas Ligeras", difficulty: "Fácil",
    ingredients: ["cebada", "papa", "zanahoria", "apio", "cebolla", "leche", "cilantro"],
    instructions: ["Lavar la cebada.", "Cocinar con verduras en caldo.", "Agregar papa.", "Añadir leche al final.", "Decorar con cilantro."]
  },
  {
    id: 404,
    title: "Chupe de Pescado",
    image: "https://i.pinimg.com/1200x/0c/23/6a/0c236ab2829aecf1f3e42f44d8854aa5.jpg",
    time: "45 min", servings: 4, category: "Cenas Ligeras", difficulty: "Media",
    ingredients: ["500g de pescado", "papa", "choclo", "leche", "huevo", "cebolla", "ajo", "achiote", "cilantro"],
    instructions: ["Sofreír cebolla y ajo con achiote.", "Agregar papas y choclo.", "Añadir caldo de pescado.", "Incorporar pescado troceado.", "Agregar leche y huevo.", "Decorar con cilantro."]
  },
  {
    id: 405,
    title: "Tacos de Pollo Saludables",
    image: "https://i.pinimg.com/1200x/f7/6c/0a/f76c0a24dab0b209c194691967caa78f.jpg",
    time: "30 min", servings: 4, category: "Cenas Ligeras", difficulty: "Fácil",
    ingredients: ["500g de pechuga de pollo", "tortillas integrales", "aguacate", "cebolla morada", "cilantro", "limón"],
    instructions: ["Sazonar y cocinar el pollo.", "Cortar en tiras.", "Calentar tortillas.", "Armar tacos y servir con limón."]
  },
  {
    id: 406,
    title: "Casabe (Pan de Yuca)",
    image: "https://i.pinimg.com/736x/cc/5f/d1/cc5fd1783d0dd8e0c4b1aa1e442aceda.jpg",
    time: "30 min", servings: 4, category: "Cenas Ligeras", difficulty: "Media",
    ingredients: ["yuca rallada y escurrida", "sal"],
    instructions: ["Rallar la yuca y exprimir bien.", "Sazonar con sal.", "Extender en sartén caliente.", "Cocinar hasta que esté seco y crujiente.", "Voltear y cocinar el otro lado.", "Servir con queso o ají."]
  },
 
  // ── PLATOS PRINCIPALES ───────────────────────────────────
  {
    id: 501,
    title: "Fritada Ecuatoriana",
    image: "https://i.pinimg.com/736x/e7/26/07/e726078a4e44feab8318bb29f09b6790.jpg",
    time: "90 min", servings: 6, category: "Platos Principales", difficulty: "Media",
    ingredients: ["2kg de carne de cerdo", "chicha de jora", "cebolla", "ajo", "comino", "sal", "mote", "choclo", "maduro frito"],
    instructions: ["Colocar cerdo en olla con agua.", "Agregar chicha, ajo y comino.", "Cocinar hasta que el agua se evapore.", "Dejar que la carne se fría en su propia grasa.", "Dorar por todos lados.", "Servir con mote, choclo y maduro."]
  },
  {
    id: 502,
    title: "Hornado Pastuzo",
    image: "https://i.pinimg.com/736x/fe/a7/33/fea733074d2c431408ca9cfc599e103e.jpg",
    time: "300 min", servings: 12, category: "Platos Principales", difficulty: "Difícil",
    ingredients: ["chancho entero", "ajo", "comino", "chicha de jora", "sal", "achiote", "cebolla", "limón"],
    instructions: ["Preparar aliño con ajo, comino y achiote.", "Untar el chancho por dentro y fuera.", "Marinar 24 horas.", "Hornear a 180°C 4-5 horas.", "Bañar con chicha cada hora.", "Servir con llapingachos y mote."]
  },
  {
    id: 503,
    title: "Seco de Res Ecuatoriano",
    image: "https://i.pinimg.com/1200x/d2/d6/39/d2d63941ae1961b40513067111c5b7a5.jpg",
    time: "90 min", servings: 4, category: "Platos Principales", difficulty: "Difícil",
    ingredients: ["1kg de carne de res", "cerveza negra", "tomate", "cebolla", "ajo", "cilantro", "comino", "achiote"],
    instructions: ["Sellar la carne.", "Sofreír cebolla y ajo con achiote.", "Agregar carne y cerveza.", "Cocinar a fuego lento 1 hora.", "Servir con arroz y menestra."]
  },
  {
    id: 504,
    title: "Seco de Chancho",
    image: "https://i.pinimg.com/1200x/65/d3/c6/65d3c6ad152b5fddd87762acd22cc29d.jpg",
    time: "90 min", servings: 6, category: "Platos Principales", difficulty: "Difícil",
    ingredients: ["1.5kg de costillas de cerdo", "cerveza", "chicha de jora", "cebolla", "ajo", "cilantro", "comino", "achiote"],
    instructions: ["Marinar el cerdo con especias.", "Sellar en aceite.", "Sofreír cebolla con achiote.", "Agregar cerveza y chicha.", "Cocinar 1 hora.", "Servir con arroz."]
  },
  {
    id: 505,
    title: "Corvina Frita con Patacones",
    image: "https://i.pinimg.com/736x/2a/df/c9/2adfc919674e59406ce26990ed7cc16b.jpg",
    time: "30 min", servings: 2, category: "Platos Principales", difficulty: "Fácil",
    ingredients: ["2 filetes de corvina", "plátano verde", "limón", "ajo", "comino", "aceite", "sal"],
    instructions: ["Sazonar corvina con ajo, limón y comino.", "Freír hasta dorar.", "Hacer patacones.", "Servir con curtido de cebolla."]
  },
  {
    id: 506,
    title: "Maito de Tilapia",
    image: "https://i.pinimg.com/1200x/0c/cf/8a/0ccf8a02bd5dd86fb6051284c39b6c95.jpg",
    time: "40 min", servings: 2, category: "Platos Principales", difficulty: "Media",
    ingredients: ["2 tilapias enteras", "hojas de bijao", "ajo", "comino", "sal", "limón", "yuca cocida"],
    instructions: ["Sazonar las tilapias.", "Envolver en hojas de bijao.", "Amarrar y cocinar a la brasa 30 min.", "Voltear a mitad.", "Servir con yuca y patacones."]
  },
  {
    id: 507,
    title: "Encocado de Pescado",
    image: "https://i.pinimg.com/736x/2f/23/4e/2f234e48478f8483319f10d602135f3c.jpg",
    time: "35 min", servings: 4, category: "Platos Principales", difficulty: "Media",
    ingredients: ["500g de pescado", "leche de coco", "cebolla", "ajo", "pimiento", "tomate", "cilantro", "comino", "achiote"],
    instructions: ["Sofreír cebolla, ajo y pimiento.", "Agregar tomate y achiote.", "Incorporar el pescado.", "Verter leche de coco.", "Cocinar 15 min.", "Decorar con cilantro y servir con arroz."]
  },
  {
    id: 508,
    title: "Papas con Cuero",
    image: "https://i.pinimg.com/736x/0f/0f/cf/0f0fcf8e5dd8996df1c4e845337caf5d.jpg",
    time: "90 min", servings: 4, category: "Platos Principales", difficulty: "Media",
    ingredients: ["500g de cuero de cerdo", "papa", "maní tostado molido", "leche", "cebolla", "ajo", "achiote", "cilantro"],
    instructions: ["Limpiar y cocinar el cuero.", "Cortar en trozos.", "Preparar salsa de maní con leche.", "Sofreír cebolla con achiote.", "Agregar papas y cuero.", "Cocinar 20 min y servir."]
  },
  {
    id: 509,
    title: "Hayacas Ecuatorianas",
    image: "https://i.pinimg.com/1200x/f1/e7/41/f1e741fb3adf8787454f2c355871c8e0.jpg",
    time: "180 min", servings: 12, category: "Platos Principales", difficulty: "Difícil",
    ingredients: ["masa de maíz", "carne de cerdo", "pollo", "pasas", "aceitunas", "pimiento", "cebolla", "hojas de plátano"],
    instructions: ["Preparar el relleno con carnes.", "Extender masa en hoja de plátano.", "Colocar relleno con aceitunas y pasas.", "Envolver y amarrar.", "Cocinar al vapor 2 horas."]
  },
  {
    id: 510,
    title: "Pasta Carbonara Clásica",
    image: "https://i.pinimg.com/1200x/f2/9f/f7/f29ff752fe9b098e8a3c9e73d5de2dec.jpg",
    time: "25 min", servings: 4, category: "Platos Principales", difficulty: "Media",
    ingredients: ["400g de espaguetis", "panceta", "4 huevos", "parmesano", "pimienta negra"],
    instructions: ["Cocinar pasta al dente.", "Freír panceta.", "Batir huevos con queso.", "Mezclar pasta con huevos.", "Agregar panceta y pimienta."]
  },
 
  // ── ENTRANTES ────────────────────────────────────────────
  {
    id: 601,
    title: "Ceviche de Camarón Ecuatoriano",
    image: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    time: "20 min", servings: 4, category: "Entrantes", difficulty: "Fácil",
    ingredients: ["500g de camarones cocidos", "tomate", "cebolla morada", "cilantro", "limón", "naranja", "salsa de tomate", "mostaza"],
    instructions: ["Mezclar salsa de tomate con limón y naranja.", "Agregar mostaza.", "Incorporar camarones.", "Agregar cebolla, tomate y cilantro.", "Servir con chifles."]
  },
  {
    id: 602,
    title: "Ceviche de Concha Negra",
    image: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    time: "15 min", servings: 2, category: "Entrantes", difficulty: "Fácil",
    ingredients: ["500g de conchas negras", "cebolla morada", "tomate", "cilantro", "limón", "naranja agria", "sal", "ají"],
    instructions: ["Abrir las conchas.", "Picar cebolla, tomate y cilantro.", "Mezclar con jugo de limón y naranja.", "Agregar ají al gusto.", "Servir con chifles."]
  },
  {
    id: 603,
    title: "Viche de Pescado",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    time: "60 min", servings: 4, category: "Entrantes", difficulty: "Media",
    ingredients: ["pescado fresco", "maní molido", "yuca", "papa", "choclo", "plátano verde", "cebolla", "ajo", "cilantro"],
    instructions: ["Preparar caldo de pescado.", "Agregar yuca, papa y verde.", "Añadir choclo.", "Incorporar maní molido.", "Cocinar hasta espesar.", "Servir con cilantro."]
  },
  {
    id: 604,
    title: "Sopa de Quinoa con Verduras",
    image: "https://images.unsplash.com/photo-1571748982800-fa51082c2224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    time: "35 min", servings: 4, category: "Entrantes", difficulty: "Fácil",
    ingredients: ["quinoa", "zanahoria", "papa", "apio", "cebolla", "caldo de verduras", "cilantro"],
    instructions: ["Sofreír cebolla y verduras.", "Agregar caldo.", "Añadir quinoa lavada.", "Cocinar 20 min.", "Decorar con cilantro."]
  },
  {
    id: 605,
    title: "Bruschetta con Tomate y Albahaca",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    time: "15 min", servings: 4, category: "Entrantes", difficulty: "Fácil",
    ingredients: ["pan rústico", "tomates maduros", "ajo", "albahaca", "aceite de oliva", "vinagre balsámico"],
    instructions: ["Tostar el pan.", "Frotar con ajo.", "Picar tomates con albahaca.", "Colocar sobre el pan.", "Rociar con aceite y balsámico."]
  },
 
  // ── GUARNICIONES ─────────────────────────────────────────
  {
    id: 701,
    title: "Patacones (Tostones)",
    image: "https://i.pinimg.com/736x/80/a1/c5/80a1c5f1ccdb7e3e0baaa88daec96307.jpg",
    time: "20 min", servings: 4, category: "Guarniciones", difficulty: "Fácil",
    ingredients: ["3 plátanos verdes", "aceite", "sal", "ajo en polvo"],
    instructions: ["Cortar plátanos en rodajas.", "Freír hasta dorar.", "Aplastar.", "Freír de nuevo hasta crujientes.", "Sazonar."]
  },
  {
    id: 702,
    title: "Mote Cocinado",
    image: "https://i.pinimg.com/736x/dd/d3/cc/ddd3cca8f6823e8ea7a0bbb0dc56190f.jpg",
    time: "90 min", servings: 6, category: "Guarniciones", difficulty: "Fácil",
    ingredients: ["mote pelado", "sal", "cebolla larga", "cilantro"],
    instructions: ["Remojar el mote la noche anterior.", "Cocinar en agua con sal 1-2 horas.", "Escurrir y sazonar.", "Servir con cebolla y cilantro."]
  },
  {
    id: 703,
    title: "Puré de Papa con Mantequilla",
    image: "https://i.pinimg.com/1200x/65/f3/1b/65f31b11336eb9de31a05d8df19bd763.jpg",
    time: "30 min", servings: 4, category: "Guarniciones", difficulty: "Fácil",
    ingredients: ["1kg de papas", "100g de mantequilla", "leche caliente", "nuez moscada", "sal"],
    instructions: ["Cocer papas hasta tiernas.", "Escurrir y machacar.", "Agregar mantequilla y leche.", "Batir hasta textura suave.", "Sazonar con nuez moscada."]
  },
  {
    id: 704,
    title: "Arroz Blanco Ecuatoriano",
    image: "https://i.pinimg.com/1200x/d1/ad/87/d1ad870e03222a1628a9ce7edb07c058.jpg",
    time: "25 min", servings: 4, category: "Guarniciones", difficulty: "Fácil",
    ingredients: ["2 tazas de arroz", "agua", "sal", "aceite", "ajo"],
    instructions: ["Sofreír ajo en aceite.", "Agregar arroz y tostar.", "Añadir agua y sal.", "Cocinar 18 min tapado.", "Esponjar con tenedor."]
  },
  {
    id: 705,
    title: "Menestra de Lentejas",
    image: "https://i.pinimg.com/736x/a6/f4/ef/a6f4ef66fbd887ec1c8b88ee4d6e99f6.jpg",
    time: "40 min", servings: 4, category: "Guarniciones", difficulty: "Fácil",
    ingredients: ["lentejas", "cebolla", "tomate", "pimiento", "ajo", "achiote", "comino"],
    instructions: ["Cocinar lentejas.", "Sofreír cebolla, tomate y pimiento.", "Agregar refrito a las lentejas.", "Sazonar y cocinar 10 min más."]
  },
  {
    id: 706,
    title: "Cuscús con Frutos Secos",
    image: "https://i.pinimg.com/736x/25/1a/41/251a41514625d75cbfe6eedaa44b6054.jpg",
    time: "15 min", servings: 4, category: "Guarniciones", difficulty: "Fácil",
    ingredients: ["cuscús", "caldo caliente", "pasas", "almendras", "menta", "aceite de oliva", "limón"],
    instructions: ["Verter caldo sobre cuscús.", "Tapar 5 min.", "Esponjar con tenedor.", "Agregar frutos secos y menta.", "Aliñar con aceite y limón."]
  },
 
  // ── POSTRES ──────────────────────────────────────────────
  {
    id: 801,
    title: "Arroz con Leche Ecuatoriano",
    image: "https://i.pinimg.com/1200x/57/3a/05/573a0590087658cb833b79a511742faa.jpg",
    time: "40 min", servings: 4, category: "Postres", difficulty: "Fácil",
    ingredients: ["arroz", "leche", "canela", "azúcar", "pasas", "clavo de olor"],
    instructions: ["Cocinar el arroz.", "Agregar leche, azúcar y canela.", "Cocinar hasta espesar.", "Agregar pasas y servir."]
  },
  {
    id: 802,
    title: "Pristiños con Miel de Panela",
    image: "https://i.pinimg.com/1200x/58/37/79/5837791aa46a56cd89cfbace56bbbb17.jpg",
    time: "45 min", servings: 8, category: "Postres", difficulty: "Media",
    ingredients: ["harina", "huevos", "mantequilla", "sal", "aceite para freír", "panela", "canela", "naranja"],
    instructions: ["Preparar masa.", "Formar los pristiños.", "Freír hasta dorar.", "Preparar miel de panela.", "Servir bañados en miel."]
  },
  {
    id: 803,
    title: "Helado de Paila",
    image: "https://i.pinimg.com/736x/98/fc/0d/98fc0da3eb58d13fe43db6e9367b4d78.jpg",
    time: "40 min", servings: 4, category: "Postres", difficulty: "Difícil",
    ingredients: ["pulpa de mora o naranjilla", "azúcar", "claras de huevo", "hielo", "sal gruesa"],
    instructions: ["Mezclar pulpa con azúcar.", "Batir claras a punto de nieve.", "Colocar en paila sobre hielo con sal.", "Girar mientras se congela.", "Incorporar claras con movimientos envolventes."]
  },
  {
    id: 804,
    title: "Quimbolitos",
    image: "https://i.pinimg.com/736x/1e/f0/2a/1ef02acb3f5e33e8588eea5deb225da9.jpg",
    time: "60 min", servings: 12, category: "Postres", difficulty: "Media",
    ingredients: ["harina de maíz", "mantequilla", "huevos", "azúcar", "queso fresco", "pasas", "hojas de achira"],
    instructions: ["Batir mantequilla con azúcar.", "Agregar huevos.", "Incorporar harina, queso y pasas.", "Colocar en hojas de achira.", "Cocinar al vapor 40 min."]
  },
  {
    id: 805,
    title: "Rosero Quiteño",
    image: "https://i.pinimg.com/1200x/92/b9/6c/92b96c4a9bbb8e5023cfbb289fb2f8e0.jpg",
    time: "60 min", servings: 8, category: "Postres", difficulty: "Media",
    ingredients: ["mote cocido", "piña", "babaco", "frutillas", "azúcar", "canela", "agua de azahar", "pétalos de rosa"],
    instructions: ["Cocinar el mote.", "Preparar almíbar con especias.", "Agregar frutas troceadas.", "Mezclar con mote.", "Servir frío con pétalos de rosa."]
  },
  {
    id: 806,
    title: "Tarta de Chocolate Sin Horno",
    image: "https://i.pinimg.com/736x/67/db/e0/67dbe0ae7dcf5fc0fbbdfeb5ab5f572f.jpg",
    time: "25 min + reposo", servings: 8, category: "Postres", difficulty: "Media",
    ingredients: ["galletas", "mantequilla", "chocolate negro", "nata"],
    instructions: ["Triturar galletas.", "Presionar en molde.", "Derretir chocolate con nata.", "Verter y refrigerar 4h."]
  },
 
  // ── VEGETARIANO/VEGANO ───────────────────────────────────
  {
    id: 901,
    title: "Locro de Papa",
    image: "https://i.pinimg.com/1200x/65/ee/dc/65eedcfd7fb9a9b70f86932263836e6c.jpg",
    time: "40 min", servings: 6, category: "Vegetariano/Vegano", difficulty: "Fácil",
    ingredients: ["papa chola", "leche", "queso fresco", "cebolla", "ajo", "achiote", "cilantro", "aguacate"],
    instructions: ["Sofreír cebolla y ajo con achiote.", "Agregar papa troceada.", "Cubrir con agua y cocinar.", "Agregar leche y cocinar 10 min.", "Servir con queso, cilantro y aguacate."]
  },
  {
    id: 902,
    title: "Fanesca Ecuatoriana",
    image: "https://i.pinimg.com/1200x/7f/6c/47/7f6c4742034036f3ca6f1a96ea1c1a5d.jpg",
    time: "120 min", servings: 10, category: "Vegetariano/Vegano", difficulty: "Difícil",
    ingredients: ["sambo", "zapallo", "choclo", "fréjol", "arveja", "lenteja", "melloco", "maní", "leche", "queso"],
    instructions: ["Cocinar cada grano por separado.", "Cocinar sambo y zapallo.", "Preparar base con cebolla.", "Unir todos los granos.", "Agregar leche y maní.", "Servir con encurtidos."]
  },
  {
    id: 903,
    title: "Ensalada Fresca de Quinoa",
    image: "https://i.pinimg.com/1200x/07/84/5b/07845b56b1ec5eeaa7c499df07b6f18d.jpg",
    time: "20 min", servings: 2, category: "Vegetariano/Vegano", difficulty: "Fácil",
    ingredients: ["quinoa", "pepino", "tomates cherry", "aguacate", "espinaca", "limón", "aceite de oliva"],
    instructions: ["Cocinar quinoa.", "Mezclar con verduras.", "Aliñar con limón y aceite.", "Agregar aguacate y servir."]
  },
  {
    id: 904,
    title: "Curry de Garbanzos con Espinaca",
    image: "https://i.pinimg.com/1200x/84/83/34/848334c4e2c6e19cbc75159285059d9c.jpg",
    time: "30 min", servings: 4, category: "Vegetariano/Vegano", difficulty: "Fácil",
    ingredients: ["garbanzos", "espinaca", "leche de coco", "tomate triturado", "curry", "cebolla", "ajo"],
    instructions: ["Sofreír cebolla y ajo.", "Agregar curry y tomate.", "Añadir garbanzos y leche de coco.", "Cocinar 15 min.", "Incorporar espinaca y servir."]
  },
  {
    id: 905,
    title: "Ceviche de Palmito",
    image: "https://i.pinimg.com/736x/ea/6c/71/ea6c7170deec03cc3927862333108c15.jpg",
    time: "15 min", servings: 2, category: "Vegetariano/Vegano", difficulty: "Fácil",
    ingredients: ["palmito", "tomate", "cebolla morada", "cilantro", "limón", "naranja", "sal"],
    instructions: ["Cortar palmito.", "Mezclar con tomate y cebolla.", "Agregar cilantro.", "Aliñar con limón y naranja.", "Sazonar y servir."]
  },
 
  // ── AIR FRYER ────────────────────────────────────────────
  {
    id: 1001,
    title: "Pollo Air Fryer Crujiente",
    image: "https://images.unsplash.com/photo-1616401616927-3c81de22dfa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    time: "18 min", servings: 3, category: "Air Fryer", difficulty: "Fácil",
    ingredients: ["muslos de pollo", "aceite de oliva", "pimentón", "ajo en polvo", "hierbas provenzales"],
    instructions: ["Marinar pollo con especias.", "Precalentar air fryer 200°C.", "Cocinar 15-18 min girando a mitad.", "Servir caliente."]
  },
  {
    id: 1002,
    title: "Chifles Air Fryer",
    image: "https://i.pinimg.com/1200x/ce/42/89/ce4289a7d1586e3139fba8f4be8323a3.jpg",
    time: "15 min", servings: 2, category: "Air Fryer", difficulty: "Fácil",
    ingredients: ["2 plátanos verdes", "aceite en spray", "sal"],
    instructions: ["Cortar en rodajas finas.", "Rociar con aceite.", "Cocinar air fryer 180°C 10-12 min.", "Agitar a mitad."]
  },
  {
    id: 1003,
    title: "Patacones Air Fryer",
    image: "https://i.pinimg.com/736x/36/c1/2b/36c12b97cb79ee1cf3115232c886d6da.jpg",
    time: "20 min", servings: 2, category: "Air Fryer", difficulty: "Fácil",
    ingredients: ["2 plátanos verdes", "aceite en spray", "sal", "ajo en polvo"],
    instructions: ["Cortar en rodajas.", "Cocinar air fryer 190°C 8 min.", "Aplastar y rociar con aceite.", "Cocinar 5 min más."]
  },
  {
    id: 1004,
    title: "Papas Fritas Air Fryer",
    image: "https://i.pinimg.com/736x/f0/40/fc/f040fc7434c3d0b1cc92b13e1f1a5262.jpg",
    time: "25 min", servings: 2, category: "Air Fryer", difficulty: "Fácil",
    ingredients: ["papas", "aceite", "sal", "pimentón", "ajo en polvo"],
    instructions: ["Cortar en bastones.", "Remojar en agua 30 min.", "Secar y mezclar con aceite.", "Cocinar air fryer 200°C 20 min.", "Agitar a mitad."]
  },
  {
    id: 1005,
    title: "Nuggets de Pollo Caseros",
    image: "https://i.pinimg.com/736x/94/96/47/94964722aa4043a77ecb2ff38a0fb48e.jpg",
    time: "20 min", servings: 4, category: "Air Fryer", difficulty: "Fácil",
    ingredients: ["pechuga de pollo", "pan rallado", "parmesano", "huevo", "ajo en polvo"],
    instructions: ["Cortar pollo.", "Pasar por huevo y pan con queso.", "Cocinar air fryer 180°C 12-15 min.", "Servir con salsa."]
  },
 
  // ── EXPRESS <20MIN ───────────────────────────────────────
  {
    id: 1101,
    title: "Sanduche de Pernil",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    time: "10 min", servings: 2, category: "Express <20min", difficulty: "Fácil",
    ingredients: ["pan redondo", "pernil de cerdo", "encurtido de cebolla", "tomate", "aguacate", "mostaza"],
    instructions: ["Abrir el pan.", "Colocar pernil.", "Agregar encurtido, tomate y aguacate.", "Añadir mostaza y servir."]
  },
  {
    id: 1102,
    title: "Batido de Naranjilla",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    time: "5 min", servings: 2, category: "Express <20min", difficulty: "Fácil",
    ingredients: ["4 naranjillas", "agua", "azúcar o panela", "hielo"],
    instructions: ["Extraer la pulpa de las naranjillas.", "Licuar con agua y endulzante.", "Colar.", "Servir con hielo."]
  },
  {
    id: 1103,
    title: "Huevos Revueltos con Atún",
    image: "https://i.pinimg.com/736x/58/84/b3/5884b32831f603af43ab0acf896ac9ff.jpg",
    time: "10 min", servings: 2, category: "Express <20min", difficulty: "Fácil",
    ingredients: ["4 huevos", "1 lata de atún", "cebolla", "tomate", "sal", "pimienta", "aceite"],
    instructions: ["Sofreír cebolla y tomate.", "Agregar atún.", "Batir huevos y verter.", "Revolver hasta cuajar.", "Sazonar y servir."]
  },
  {
    id: 1104,
    title: "Arroz con Huevo Frito",
    image: "https://i.pinimg.com/1200x/7e/6d/6b/7e6d6bc2ad8df7541eed24456d45cd8f.jpg",
    time: "15 min", servings: 1, category: "Express <20min", difficulty: "Fácil",
    ingredients: ["arroz cocido", "2 huevos", "sal", "aceite", "cebolla larga", "cilantro"],
    instructions: ["Calentar arroz.", "Freír los huevos.", "Colocar encima del arroz.", "Decorar con cebolla y cilantro."]
  },
  {
    id: 1105,
    title: "Salmón a la Parrilla con Limón",
    image: "https://i.pinimg.com/1200x/43/22/0d/43220d27dc8e081b22118ac6b1ec4d15.jpg",
    time: "15 min", servings: 2, category: "Express <20min", difficulty: "Fácil",
    ingredients: ["filetes de salmón", "limón", "ajo", "eneldo", "aceite de oliva"],
    instructions: ["Marinar salmón.", "Cocinar en parrilla 4-5 min por lado.", "Servir con limón."]
  },
 
  
 
  // ── SIN HORNO ────────────────────────────────────────────
  {
    id: 1301,
    title: "Tiramisú Clásico",
    image: "https://i.pinimg.com/1200x/37/09/82/370982e5fbc654425435518793817eec.jpg",
    time: "30 min + reposo", servings: 6, category: "Sin Horno", difficulty: "Media",
    ingredients: ["bizcochos", "mascarpone", "café", "huevos", "azúcar", "cacao"],
    instructions: ["Batir yemas con azúcar.", "Mezclar con mascarpone.", "Montar claras.", "Mojar bizcochos en café.", "Alternar capas y refrigerar 4h."]
  },
  {
    id: 1302,
    title: "Cheesecake Sin Horno",
    image: "https://i.pinimg.com/736x/4e/e4/6d/4ee46d6a921d611f1a71889072add8f3.jpg",
    time: "30 min + reposo", servings: 8, category: "Sin Horno", difficulty: "Media",
    ingredients: ["galletas", "mantequilla", "queso crema", "azúcar", "nata", "limón", "gelatina", "mermelada"],
    instructions: ["Hacer base de galletas.", "Batir queso con azúcar.", "Incorporar nata.", "Verter sobre base y refrigerar 6h."]
  },
  {
    id: 1303,
    title: "Espumillas de Guayaba",
    image: "https://i.pinimg.com/736x/ad/ac/7a/adac7a298f76ffe7ca62a0ccba04fbde.jpg",
    time: "20 min", servings: 6, category: "Sin Horno", difficulty: "Media",
    ingredients: ["claras de huevo", "guayaba madura", "azúcar", "limón"],
    instructions: ["Batir claras a punto de nieve.", "Preparar pulpa de guayaba.", "Incorporar azúcar y guayaba.", "Batir hasta textura espesa.", "Servir en conos."]
  },
  {
    id: 1304,
    title: "Trufas de Chocolate",
    image: "https://i.pinimg.com/1200x/94/2f/08/942f08952b1787446e2c30bb6618171c.jpg",
    time: "20 min + reposo", servings: 20, category: "Sin Horno", difficulty: "Fácil",
    ingredients: ["chocolate negro", "nata", "mantequilla", "cacao en polvo"],
    instructions: ["Calentar nata sobre chocolate.", "Agregar mantequilla.", "Enfriar 2h.", "Formar bolitas y rebozar en cacao."]
  },
 
  //  Bajo en Carbohidratos ────────────────────────────────────────
  {
    id: 1401,
    title: "Ensalada Keto de Aguacate y Pollo",
    image: "https://i.pinimg.com/736x/1e/04/85/1e048537c09770381c09dd7ea23b7461.jpg",
    time: "15 min", servings: 2, category: "Bajo en Carbohidratos", difficulty: "Fácil",
    ingredients: ["pollo cocido", "aguacate", "lechuga", "queso feta", "aceite de oliva"],
    instructions: ["Cortar pollo y aguacate.", "Mezclar con lechuga.", "Agregar queso y aliñar."]
  },
  {
    id: 1402,
    title: "Huevos con Tocino y Aguacate",
    image: "https://i.pinimg.com/736x/ae/fd/7c/aefd7c55fe07668e7be3c683557029ad.jpg",
    time: "15 min", servings: 2, category: "Bajo en Carbohidratos", difficulty: "Fácil",
    ingredients: ["4 huevos", "tocino", "aguacate", "sal", "pimienta"],
    instructions: ["Freír tocino.", "Cocinar huevos.", "Servir con aguacate."]
  },
  {
    id: 1403,
    title: "Sopa de Coliflor Cremosa",
    image: "https://i.pinimg.com/1200x/b5/33/2d/b5332de5e9096a5d23f354174cd89cf6.jpg",
    time: "30 min", servings: 4, category: "Bajo en Carbohidratos", difficulty: "Fácil",
    ingredients: ["coliflor", "caldo de pollo", "nata", "cebolla", "ajo", "queso cheddar"],
    instructions: ["Cocinar coliflor con cebolla.", "Licuar con caldo.", "Agregar nata y queso.", "Servir caliente."]
  },
 
  // ── COCCIÓN LENTA ─────────────────────────────────────────
  {
    id: 1501,
    title: "Seco de Gallina en Olla Lenta",
    image: "https://i.pinimg.com/1200x/8a/ee/65/8aee65920e9dc9cbe6c89bf861fd9888.jpg",
    time: "8 horas", servings: 6, category: "Cocción lenta", difficulty: "Fácil",
    ingredients: ["gallina en presas", "chicha de jora", "cebolla", "ajo", "cilantro", "achiote", "comino"],
    instructions: ["Marinar la gallina.", "Sofreír cebolla con achiote.", "Colocar todo en olla lenta.", "Agregar chicha.", "Cocinar 8h.", "Servir con arroz."]
  },
  {
    id: 1502,
    title: "Rabo de Toro Estofado",
    image: "https://i.pinimg.com/736x/1c/94/e4/1c94e4d93efd7b79a5e577778057f937.jpg",
    time: "8 horas", servings: 4, category: "Cocción lenta", difficulty: "Media",
    ingredients: ["rabo de toro", "vino tinto", "cebolla", "zanahoria", "ajo", "tomate", "hierbas"],
    instructions: ["Sellar el rabo.", "Sofreír verduras.", "Colocar en olla lenta.", "Agregar vino.", "Cocinar 8h.", "Servir con puré de papa."]
  },
  {
    id: 1503,
    title: "Guiso de Lentejas en Olla Lenta",
    image: "https://i.pinimg.com/1200x/b9/28/55/b9285523f45f58dc2885533dc5079f5c.jpg",
    time: "6 horas", servings: 6, category: "Cocción lenta", difficulty: "Fácil",
    ingredients: ["lentejas", "cebolla", "zanahoria", "apio", "caldo", "tomates", "comino"],
    instructions: ["Colocar todo en la olla.", "Cocinar 6-8h en bajo.", "Ajustar sazón y servir."]
  },
  {
    id: 1504,
    title: "Pollo Desmechado en Olla Lenta",
    image: "https://i.pinimg.com/736x/5e/5d/a3/5e5da395491fd4cefcee47fbf013422a.jpg",
    time: "6 horas", servings: 6, category: "Cocción lenta", difficulty: "Fácil",
    ingredients: ["pechuga de pollo", "salsa BBQ", "cebolla", "ajo", "caldo"],
    instructions: ["Colocar pollo en olla.", "Agregar salsa y verduras.", "Cocinar 6-8h.", "Desmechar y servir."]
  },
 
  // ── LLAPINGACHOS ─────────────────────────────────────────
  {
    id: 1601,
    title: "Llapingachos con Chorizo",
    image: "https://i.pinimg.com/1200x/c8/03/56/c803560ba591ab768917980aef2a8d8b.jpg",
    time: "45 min", servings: 4, category: "Platos Principales", difficulty: "Media",
    ingredients: ["papa chola", "queso fresco", "cebolla", "achiote", "chorizo", "curtido de cebolla"],
    instructions: ["Cocinar y machacar papas.", "Rellenar con queso.", "Asar en sartén con achiote.", "Freír chorizo.", "Servir con curtido y aguacate."]
  },
 
  // ── BEBIDAS ECUATORIANAS ──────────────────────────────────
  {
    id: 1701,
    title: "Chicha de Jora",
    image: "https://i.pinimg.com/736x/75/31/71/753171816f3bc95db96659b5db9fec15.jpg",
    time: "30 min + fermentación", servings: 8, category: "Express <20min", difficulty: "Media",
    ingredients: ["jora (maíz germinado)", "panela", "canela", "clavo de olor", "ishpingo", "agua"],
    instructions: ["Cocinar la jora 2 horas.", "Colar y agregar panela y especias.", "Hervir 30 min.", "Dejar fermentar 2-3 días.", "Servir fría."]
  },

  // ── SIN GLUTEN ────────────────────────────────────────────
  {
    id: 2101,
    title: "Arroz con Pollo Sin Gluten",
    image: "https://i.pinimg.com/736x/2c/0d/31/2c0d31b01f517379f29d652366f5452e.jpg",
    time: "45 min", servings: 4, category: "Sin Gluten", difficulty: "Fácil",
    ingredients: ["arroz", "pollo", "cebolla", "pimiento", "ajo", "achiote", "cilantro", "sal"],
    instructions: ["Sofreír cebolla, pimiento y ajo.", "Agregar pollo y dorar.", "Añadir arroz y caldo.", "Sazonar con achiote.", "Cocinar hasta que el arroz esté listo.", "Decorar con cilantro."]
  },
  {
    id: 2102,
    title: "Tortilla de Papa Sin Gluten",
    image: "https://i.pinimg.com/1200x/e5/16/7d/e5167d9853df912d78d7246cff8d8567.jpg",
    time: "35 min", servings: 4, category: "Sin Gluten", difficulty: "Media",
    ingredients: ["papas", "huevos", "cebolla", "aceite de oliva", "sal"],
    instructions: ["Freír papas y cebolla suavemente.", "Mezclar con huevos batidos.", "Cuajar en sartén por ambos lados.", "Servir caliente o fría."]
  },
  {
    id: 2103,
    title: "Ensalada de Quinoa Sin Gluten",
    image: "https://i.pinimg.com/736x/c2/b6/9b/c2b69b58f18a5af5e1c09d492b3cc3e2.jpg",
    time: "20 min", servings: 2, category: "Sin Gluten", difficulty: "Fácil",
    ingredients: ["quinoa", "pepino", "tomate cherry", "aguacate", "limón", "aceite de oliva", "cilantro"],
    instructions: ["Cocinar quinoa y enfriar.", "Mezclar con verduras.", "Aliñar con limón y aceite.", "Agregar aguacate y servir."]
  },
  {
    id: 2104,
    title: "Pollo al Horno con Hierbas Sin Gluten",
    image: "https://i.pinimg.com/1200x/64/c3/e4/64c3e4c9cc085701209fc8ef894c66de.jpg",
    time: "50 min", servings: 4, category: "Sin Gluten", difficulty: "Fácil",
    ingredients: ["pollo entero o presas", "romero", "tomillo", "ajo", "limón", "aceite de oliva", "sal", "pimienta"],
    instructions: ["Marinar el pollo con hierbas, ajo y limón.", "Colocar en bandeja.", "Hornear a 200°C 40 min.", "Bañar con los jugos a mitad.", "Servir con ensalada."]
  },
  {
    id: 2105,
    title: "Sopa de Lentejas Sin Gluten",
    image: "https://i.pinimg.com/736x/16/61/7c/16617c269cc734e2654f40dadf9667fd.jpg",
    time: "40 min", servings: 6, category: "Sin Gluten", difficulty: "Fácil",
    ingredients: ["lentejas", "zanahoria", "papa", "cebolla", "ajo", "comino", "achiote", "cilantro"],
    instructions: ["Sofreír cebolla y ajo.", "Agregar zanahoria y papa.", "Añadir lentejas y caldo.", "Sazonar con comino.", "Cocinar 30 min.", "Decorar con cilantro."]
  },
  {
    id: 2106,
    title: "Brownie de Chocolate Sin Gluten",
    image: "https://i.pinimg.com/1200x/f9/a7/b7/f9a7b732606400ac6885b637880c3a6a.jpg",
    time: "40 min", servings: 8, category: "Sin Gluten", difficulty: "Media",
    ingredients: ["chocolate negro", "mantequilla", "huevos", "azúcar", "harina de almendra", "cacao en polvo"],
    instructions: ["Derretir chocolate con mantequilla.", "Batir huevos con azúcar.", "Mezclar con harina de almendra.", "Hornear 25 min a 180°C.", "Dejar enfriar antes de cortar."]
  },
 
  // ── SALUDABLE ─────────────────────────────────────────────
  {
    id: 2201,
    title: "Bowl de Proteína con Huevo y Quinoa",
    image: "https://i.pinimg.com/736x/ae/2b/08/ae2b0817c4ff7e5829f408796decba30.jpg",
    time: "20 min", servings: 1, category: "Saludable", difficulty: "Fácil",
    ingredients: ["quinoa", "2 huevos", "espinaca", "aguacate", "semillas de chía", "limón", "aceite de oliva"],
    instructions: ["Cocinar quinoa.", "Hacer huevos al gusto.", "Montar bowl con espinaca.", "Agregar quinoa, huevos y aguacate.", "Aliñar con limón y semillas."]
  },
  {
    id: 2202,
    title: "Salmón al Horno con Verduras",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    time: "30 min", servings: 2, category: "Saludable", difficulty: "Fácil",
    ingredients: ["filetes de salmón", "brócoli", "zanahoria", "limón", "ajo", "aceite de oliva", "eneldo"],
    instructions: ["Colocar salmón en bandeja.", "Rodear con verduras.", "Aliñar con aceite, limón y ajo.", "Hornear 20-25 min a 200°C.", "Servir con eneldo."]
  },
  {
    id: 2203,
    title: "Ensalada de Espinaca con Fresas",
    image: "https://i.pinimg.com/1200x/b8/e6/2d/b8e62df4b4b6a7e278d7df4266f0db41.jpg",
    time: "10 min", servings: 2, category: "Saludable", difficulty: "Fácil",
    ingredients: ["espinaca fresca", "fresas", "nueces", "queso feta", "vinagre balsámico", "aceite de oliva", "miel"],
    instructions: ["Lavar espinaca y fresas.", "Montar ensalada.", "Agregar nueces y queso.", "Aliñar con balsámico, aceite y miel."]
  },
  {
    id: 2204,
    title: "Smoothie de Espinaca y Plátano",
    image: "https://i.pinimg.com/736x/8b/af/de/8bafde72b90c2a5a6ab22339fcfa5536.jpg",
    time: "5 min", servings: 1, category: "Saludable", difficulty: "Fácil",
    ingredients: ["espinaca", "plátano", "leche de almendras", "miel", "semillas de chía", "hielo"],
    instructions: ["Licuar todos los ingredientes.", "Agregar hielo.", "Servir inmediatamente."]
  },
  {
    id: 2205,
    title: "Pollo a la Plancha con Ensalada",
    image: "https://i.pinimg.com/1200x/1b/f8/e3/1bf8e3a01d1d36d64379c3745d19193e.jpg",
    time: "20 min", servings: 2, category: "Saludable", difficulty: "Fácil",
    ingredients: ["pechugas de pollo", "lechuga mixta", "tomate", "pepino", "limón", "aceite de oliva", "sal", "pimienta"],
    instructions: ["Sazonar el pollo con sal, pimienta y limón.", "Cocinar en plancha 5-6 min por lado.", "Preparar ensalada con verduras.", "Servir juntos aliñados con aceite."]
  },
  {
    id: 2206,
    title: "Avena con Frutas y Nueces",
    image: "https://i.pinimg.com/1200x/ed/f1/8f/edf18f8f5cf094623615fafeda6dfe6d.jpg",
    time: "10 min", servings: 1, category: "Saludable", difficulty: "Fácil",
    ingredients: ["avena", "leche o agua", "plátano", "arándanos", "nueces", "canela", "miel"],
    instructions: ["Cocinar avena con leche.", "Agregar canela.", "Servir con frutas y nueces.", "Rociar con miel."]
  },

  
];