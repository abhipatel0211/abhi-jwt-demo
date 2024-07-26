"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // console.log("response", response);

      const data = await response.json();
      // console.log("data ", data);

      if (response && data) {
        document.cookie = `token=${data}; path=/`;
        router.push("/protected");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

  return (
    <div className="bg-slate-400 flex flex-col items-center justify-center gap-3 h-screen">
      <div className="text-3xl">Login</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex gap-3">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-slate-300 m-2">
          Login
        </button>
        <p>
          Use Username as <b>user</b> and Password as <b>password</b>
        </p>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
