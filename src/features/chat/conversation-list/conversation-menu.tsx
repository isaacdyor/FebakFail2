import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";

export const ConversationMenu = () => {
  return (
    <div className="flex h-10 items-center gap-4 border-b p-2">
      <Input placeholder="Search conversation" className="h-6" />
      <SquarePen className="h-5 w-5 shrink-0 text-muted-foreground" />
    </div>
  );
};
