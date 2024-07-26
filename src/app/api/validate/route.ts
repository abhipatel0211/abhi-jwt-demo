import { validate_jwt } from "abhi-jwt";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    // console.log("token 1 ", token);

    if (!token || token === undefined) {
      return NextResponse.json(
        { isValid: false, message: "No token provided" },
        { status: 401 }
      );
    }
    // console.log("token ", token);
    const isValid = validate_jwt("your-secret-key", token);
    if (!isValid) {
      return NextResponse.json(
        { isValid: false, message: "Invalid token" },
        { status: 401 }
      );
    }
    return NextResponse.json({ isValid });
  } catch (error) {
    console.error("Validation error:", error);
    return NextResponse.json(
      { isValid: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
