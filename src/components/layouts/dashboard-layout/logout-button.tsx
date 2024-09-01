import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export const LogoutButton = () => {
  const supabase = createClient();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
  };
  return (
    <div
      onClick={handleLogout}
      className="flex gap-2 rounded-md px-2 py-1 hover:cursor-pointer hover:bg-muted"
    >
      <LogOut className="h-5 w-5 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Logout</p>
    </div>
  );
};
