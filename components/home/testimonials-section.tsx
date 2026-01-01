import { createClient } from "@/utils/supabase/server";
import { TestimonialsSectionClient } from "./testimonials-section-client";

export async function TestimonialsSection() {
    const supabase = await createClient();

    const { data: testimonials } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true })
        .limit(10);

    return <TestimonialsSectionClient testimonials={testimonials || []} />;
}
