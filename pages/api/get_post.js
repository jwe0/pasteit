import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const { id } = req.query;
    console.log(id)
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    );
    const { data, error } = await supabase.from("pastes").select("*").eq("id", id);
    res.status(200).json(data);
}
