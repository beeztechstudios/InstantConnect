import { createClient } from "@/utils/supabase/server";
import { JustDroppedClient } from "./just-dropped-client";

export async function JustDropped() {
    const supabase = await createClient();

    // Fetch the just dropped hero product (only one can have this tag)
    const { data: heroProduct } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .eq("is_just_dropped_hero", true)
        .single();

    // Fetch other newest products for the side cards (exclude hero if exists)
    const { data: products } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .neq("is_just_dropped_hero", true)
        .order("created_at", { ascending: false })
        .limit(2);

    return <JustDroppedClient heroProduct={heroProduct} products={products || []} />;
}
