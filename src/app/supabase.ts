import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ylklpdvdojknhnwalkvt.supabase.co";
const SUPABASE_KEY = "sb_publishable_PtkkZcSSCc5guQwSGdD1pg_K2ChqEeJ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Ping automático cada 4 días para mantener Supabase activo
const CUATRO_DIAS = 4 * 24 * 60 * 60 * 1000;
setInterval(async () => {
  await supabase.from("recipes").select("id").limit(1);
}, CUATRO_DIAS);