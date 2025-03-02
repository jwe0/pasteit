import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    );
    const { data } = req.body;
    console.log(data)
    const { datax, error } = await supabase.from("pastes").insert({ data });
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    const { count, error2 }  = await supabase.from("pastes").select("*", {
        count: "exact",
        head: true,
    });
    res.status(200).json({
        url : "/paste?id=" + count
    });
}