import { NextResponse } from "next/server";

export const ErrorResponse = (status: number, message: string) => {
  const res = new NextResponse();
  // console.log(req, ctx)
  return NextResponse.json(
    {
      message,
      url: res.url,
      time: new Date().toISOString(),
      method: res.headers.get("method"),
    },
    { status }
  );
};
