"use client";

import { useEffect } from "react";
import { useAuthContext } from "@/contexts/authContexts";

export default function Page() {
  const { logout } = useAuthContext();

  useEffect(() => {
    logout();
  });

  return null;
}