import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    );
    const { data, error } = await supabase.from("users").select("*").eq("session_id", req.body.session_id);
    const post = data[0];
    res.status(200).json({
        username: post.username
    });
}