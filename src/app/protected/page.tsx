"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutPage from "../logout/page";

const ProtectedPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith(""));

      if (token && token !== undefined) {
        // console.log("token ", token);
        try {
          const response = await fetch("/api/validate", {
            headers: {
              Authorization: `Bearer ${token.split("=")[1]}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            router.push("/");
          }
        } catch (error) {
          console.error("Failed to fetch data", error);
          router.push("/");
        }
      } else {
        router.push("/");
      }
    };

    fetchData();
  }, [router]);

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-slate-500 flex flex-col items-center justify-center h-screen">
      <h1>Protected Page</h1>
      <p>You are logged in and can access this page.</p>
      <LogoutPage />
    </div>
  );
};

export default ProtectedPage;
