"use client";

import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/authContexts";

function Layout({ children }) {
    const { isLoggedIn } = useAuthContext();
  
    if (isLoggedIn) {
      redirect("/admin/episodios");
    }
  
    return <>
      {children}      
    </>;
  }
  
  export default Layout;