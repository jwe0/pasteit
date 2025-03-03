import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const { id, password } = req.body;
    console.log(id)
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    );
    const { data, error } = await supabase.from("pastes").select("*").eq("uuid", id);
    const post = data[0];

    if (post.password != createHash("sha256").update(process.env.ID_RAND_KEY + password).digest("hex")) {
        res.status(401).json({ message: "Password protected" });
    }
    res.status(200).json({
        title: post.title,
        data: post.data
    });
}
