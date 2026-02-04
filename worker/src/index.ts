export interface Env {
  GEMINI_API_KEY: string;
}

const ALLOWED_ORIGIN = "https://sm2909.github.io";

function withCors(resp: Response) {
  const newHeaders = new Headers(resp.headers);
  newHeaders.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  newHeaders.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  newHeaders.set("Access-Control-Allow-Headers", "Content-Type");
  return new Response(resp.body, {
    status: resp.status,
    statusText: resp.statusText,
    headers: newHeaders,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Always handle OPTIONS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Only allow POST
    if (request.method !== "POST") {
      return withCors(new Response("Method not allowed", { status: 405 }));
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return withCors(new Response("Invalid JSON", { status: 400 }));
    }

    const geminiResp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const text = await geminiResp.text();

    return withCors(
      new Response(text, {
        status: geminiResp.status,
        headers: { "Content-Type": "application/json" },
      })
    );
  },
};
