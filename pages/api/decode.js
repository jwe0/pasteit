import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
import crypto from "crypto";

function decrypt(data, password) {
    const key = (process.env.ENCRYPTION_KEY + password).slice(0, 32);
    const { iv, data: encryptedData } = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const { id, password } = req.body;
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
        data: decrypt(post.data)
    });
}
