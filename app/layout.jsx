import "./globals.css";
import { Rubik } from "next/font/google";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

//components
import Navbar from "@/components/Navbar";

export const dynamic = "force-dynamic";

const rubik = Rubik({ subsets: ["latin"], preload: true });

export const metadata = {
  title: "Successes",
  description: "Save all your succeses in one place",
};

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={rubik.className}>
        <Navbar session={data.session} />
        {children}
      </body>
    </html>
  );
}
