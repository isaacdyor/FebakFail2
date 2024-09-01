import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisIcon, LogOut } from "lucide-react";
import { LogoutButton } from "./logout-button";
import { Button } from "@/components/ui/button";

export const UserMenu = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="group flex items-center gap-2 rounded-md px-2 py-1 hover:cursor-pointer hover:bg-secondary">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="border bg-background text-sm">
              JD
            </AvatarFallback>
          </Avatar>
          <p className="text-muted-foreground">isaac@dyor.com</p>
          <EllipsisIcon className="h-5 w-5 text-muted-foreground" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-1">
        <div className="flex flex-col gap-2">
          <LogoutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
};
