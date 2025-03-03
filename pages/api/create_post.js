import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    );
    const { data, title, unlisted, password_protected, password, username } = req.body;
    if (!data || !title) {
        return res.status(400).json({ message: "Missing data or title" });
    }
    const { count, error2 }  = await supabase.from("pastes").select("*", {
        count: "exact",
        head: true,
    });
    const uuid = createHash("sha256").update(process.env.ID_RAND_KEY + count).digest("hex");
    if (password) {
        var pw = createHash("sha256").update(process.env.ID_RAND_KEY + password).digest("hex");
    } else {
        pw = null
    }
    const { datax, error } = await supabase.from("pastes").insert({ data, title, uuid, unlisted, password_protected, password: pw, username });
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    res.status(200).json({
        url : "/paste?id=" + uuid
    });
}