"use client";

import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/authContexts";
import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

function Layout({ children }) {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    redirect("/login");
  }

  return <div>
    <Sidebar>
    {children}
    </Sidebar>
    
  </div>;
}

export default Layout;