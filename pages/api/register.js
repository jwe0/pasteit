import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { createHash } from "crypto";
import { serialize } from "cookie";

export default async function handler(req, res) {
    var account_num;
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    );
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: "Missing username" });
    }
    const { data: user_check, error: user_check_error } = await supabase.from("users").select("*").eq("username", username);
    if (user_check.length > 0) {
        return res.status(400).json({ message: "Username already exists" });
    }

    account_num = nanoid(16);

    const account_num_hash = createHash("sha256").update(process.env.ID_RAND_KEY + account_num).digest("hex");

    const { data: account_check, error: account_check_error } = await supabase.from("users").select("*").eq("account_number", account_num_hash);
    if (account_check.length > 0) {
        return res.status(400).json({ message: "Account number already exists" });
    }

    const { data, error2 } = await supabase.from("users").insert({ username: username, account_number: account_num_hash });
    if (error2) {
        return res.status(500).json({ message: error2.message });
    }

    res.status(200).json({ message: "User created", account_number: account_num });

}