"use client";

import { Sidebar } from "./sidebar";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
};
