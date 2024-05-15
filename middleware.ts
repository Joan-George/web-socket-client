import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const token = cookies().get("token");
	if (!token && request.url !== "http://localhost:3000/") {
		return NextResponse.redirect("http://localhost:3000");
	}
	return NextResponse.next();
}
