"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// components
import AuthForm from "@/components/AuthForm";

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(function () {
    document.title = "Successes | User Sing Up";

    return () => {
      document.title = "Successes";
    };
  }, []);

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    setError("");

    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
    }
    if (!error) {
      router.refresh();
      router.push("/verify");
    }
  };
  return (
    <main>
      <h2 className="text-center">Sign Up</h2>

      <AuthForm handleSubmit={handleSubmit} />

      {error && <div className="error">{error}</div>}
    </main>
  );
}
