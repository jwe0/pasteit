import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
    var posts = [];
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    );
    const { data, error } = await supabase.from("pastes").select("title, uuid, unlisted, username");
    for (var i = 0; i < data.length; i++) {
        if (data[i].unlisted == false) {
            posts.push({
                title: data[i].title,
                uuid: data[i].uuid,
                username: data[i].username || "Anonymous",
                is_encrypted: data[i].password_protected
            });
        }
    }
    res.status(200).json(posts);
}