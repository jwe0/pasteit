import { NextResponse, NextRequest } from "next/server";

const ratelimit = new Map();

export async function middleware(request) {
    let browser_uuid = request.cookies.get("browser_uuid")?.value;
    const response = NextResponse.next();
    const limit = 1;
    const time = 60 * 1000;

    if (!request.nextUrl.pathname.startsWith("/api/create_post")) {
        return response;
    }

    if (!browser_uuid) {
        browser_uuid = crypto.randomUUID();
        response.cookies.set("browser_uuid", browser_uuid);
    }

    if (!ratelimit.has(browser_uuid)) {
        ratelimit.set(browser_uuid, {
            count: 0,
            last_reset: Date.now()
        })
    }

    const data = ratelimit.get(browser_uuid);

    if (Date.now() - data.last_reset > time) {
        data.count = 0;
        data.last_reset = Date.now();
    }

    if (data.count >= limit) {
        return NextResponse.json({ message: "Rate limit exceeded" }, { status: 429 });
    }

    data.count+=1;

    return response
}