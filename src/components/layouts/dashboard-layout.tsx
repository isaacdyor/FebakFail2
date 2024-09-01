"use client";

import { dashboardConfig } from "@/config/dashboard-config";
import { Logo } from "../logo";
import { Icons } from "../icons";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const segment = useSelectedLayoutSegment();
  return (
    <div className="flex">
      <div className="flex h-screen w-64 flex-col justify-between border-r p-4">
        <div className="flex flex-col gap-8">
          <Logo />

          <div className="flex flex-col gap-1">
            {dashboardConfig.map((item) => {
              const Icon = Icons[item.icon as keyof typeof Icons];
              return (
                <div
                  key={item.label}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-2 text-muted-foreground hover:cursor-pointer hover:bg-secondary",
                    item.url.startsWith(`/${segment}`) ? "bg-secondary" : "",
                  )}
                >
                  <Icon stroke="hsl(var(--muted-foreground))" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {children}
    </div>
  );
};
