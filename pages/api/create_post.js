import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
import crypto from "crypto";

function encrypt(data, password_protected, password) {
    let key;
    if (password_protected) {
        key = (process.env.ENCRYPTION_KEY + password).slice(0, 32);
    } else {
        key = process.env.ENCRYPTION_KEY;
    }
    const iv  = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const payload =  JSON.stringify({
        iv: iv.toString('hex'),
        data: encrypted
    });
    return Buffer.from(payload, "utf-8").toString("base64");
}

export default async function handler(req, res) {
    var username_stable;
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    );
    const { data, title, unlisted, password_protected, password, username, account_number } = req.body;
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
    if (account_number) {
        const account_number_hash = createHash("sha256").update(process.env.ID_RAND_KEY + account_number).digest("hex");
        const { data: user_check, error: user_check_error } = await supabase.from("users").select("*").eq("account_number", account_number_hash);
        if (user_check.length > 0) {
            username_stable = user_check[0].username;
        } else {
            console.log(user_check)
        }
    } else {
        username_stable = username;
    }
    const { datax, error } = await supabase.from("pastes").insert({ data: encrypt(data, password_protected, password), title, uuid, unlisted, password_protected, password: pw, username: username_stable });
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    res.status(200).json({
        url : "/paste?id=" + uuid
    });
}