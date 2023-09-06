"use client";

import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/authContexts";
import { ReactNode } from "react";

function Layout({ children }) {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    redirect("/login");
  }

  return <div>{children}</div>;
}

export default Layout;