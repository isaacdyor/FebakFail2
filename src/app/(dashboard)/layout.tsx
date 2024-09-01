import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { UserProvider } from "@/hooks/user-provider";
import { createClient, getUser } from "@/lib/supabase/server";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const supabase = createClient();
  const { user } = await getUser();
  if (!user) return null;
  return (
    <>
      <UserProvider user={user}>
        <DashboardLayout>{children}</DashboardLayout>
      </UserProvider>
    </>
  );
};

export default RootLayout;
