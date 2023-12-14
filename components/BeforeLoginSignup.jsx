import Link from "next/link";

export default function BeforeLoginSignup() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">Login Or Sign Up</h2>
      <p>Before login or sign up please</p>
      <p>
        <Link href="/login">Login</Link>
        &#47;
        <Link href="/signup">Sign Up</Link>
      </p>
    </main>
  );
}
