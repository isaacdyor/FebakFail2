import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { getUser } from "@/lib/supabase/server";
import { UserProvider } from "@/providers/auth-provider";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
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
