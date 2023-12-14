"use client";

import { useEffect } from "react";

export default function Verify() {
  useEffect(function () {
    document.title = "Successes | User Sign Up Verify";

    return () => {
      document.title = "Successes";
    };
  }, []);

  return (
    <main className="text-center">
      <h2>Thanks for registering!</h2>
      <p>Before logging in, you need to verify your email address.</p>
    </main>
  );
}
