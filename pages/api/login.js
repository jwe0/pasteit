import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { createHash } from "crypto";
import { serialize } from "cookie";

function make_sess_id() {
    return createHash("sha256").update(process.env.ID_RAND_KEY + nanoid(64)).digest("hex");
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    );
    const { account_number } = req.body;
    if (!account_number) {
        return res.status(400).json({ message: "Missing account number" });
    }
    const account_number_hash = createHash("sha256").update(process.env.ID_RAND_KEY + account_number).digest("hex");
    const { data, error } = await supabase.from("users").select("*").eq("account_number", account_number_hash);
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    if (data.length == 0) {
        return res.status(401).json({ message: "Account number not found" });
    }
    const session_id = make_sess_id();

    await supabase.from("users").update({session_id: session_id}).eq("account_number", account_number_hash);
    
    const account_cookie = serialize("session_id", session_id, {
        httpOnly: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
    })



    res.setHeader("Set-Cookie", [account_cookie]);

    res.status(200).json({
        account_number: account_number_hash
    });
}