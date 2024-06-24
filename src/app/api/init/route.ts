import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return new Response("set", {
    status: 200,
    headers: { "Set-Cookie": `token=${"hello cookie"}; Secure; HttpOnly ` },
  });
}
