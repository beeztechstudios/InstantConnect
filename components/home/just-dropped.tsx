import { createClient } from "@/utils/supabase/server";
import { JustDroppedClient } from "./just-dropped-client";

export async function JustDropped() {
    const supabase = await createClient();

    // Fetch the newest products (most recently created)
    const { data: products } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(3);

    return <JustDroppedClient products={products || []} />;
}
