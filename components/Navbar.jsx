import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/goal-bold.png";
import LogoutButton from "@/components/LogoutButton";

export default function Navbar({ session }) {
  return (
    <nav>
      <Link href="/">
        <Image
          src={Logo}
          alt="Dojo Helpdesk logo"
          width={40}
          placeholder="blur"
          quality={100}
        />
      </Link>

      <Link href="/">
        <h1 className="text-2xl">Successes</h1>
      </Link>

      {/* auth buttons */}
      <span className="ml-auto"></span>

      {!session && (
        <>
          <Link href="/login">Log In</Link>
          <Link href="/signup">Sign Up</Link>
        </>
      )}

      {session && (
        <>
          <span>{session.user.email}</span>
          <LogoutButton />
        </>
      )}
    </nav>
  );
}

/* 
/// Alttaki cozum de yapılabilir
{session ? (
        <>
          <span>{session.user.email}</span>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link href="/login">Log In</Link>
          <Link href="/signup">Sign Up</Link>
        </>
      )}
*/
