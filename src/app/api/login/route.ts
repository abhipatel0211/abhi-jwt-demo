import { NextResponse } from "next/server";
import { encode_jwt } from "abhi-jwt"; // Import your JWT encoding function

export async function POST(request: Request, response: Response) {
  try {
    const { username, password } = await request.json();

    // console.log("Login successful1");
    // Dummy credentials validation for demonstration purposes
    if (username === "user" && password === "password") {
      // console.log("Login successful2");
      const token = encode_jwt(
        "your-secret-key",
        username,
        { role: "user" },
        3600
      ); // 1 hour expiration
      // console.log("token ", token);
      return NextResponse.json(token);
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
