"use client";

import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/use-chat";
import { useState } from "react";

export const DetailMenu = () => {
  const [isFocused, setIsFocused] = useState(false);

  const { activeVisitors } = useChat();

  console.log(activeVisitors);

  return (
    <div className="relative">
      <div className="flex h-10 w-full items-center gap-1 border-b px-2">
        <p>To:</p>
        <Input
          placeholder="Search or start new chat"
          className="h-6 w-full border-none focus-visible:ring-transparent"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {isFocused && (
        <div className="absolute flex h-10 w-full flex-col bg-red-500">
          {activeVisitors.map((visitor) => (
            <div key={visitor.id} className="flex items-center gap-2 p-2">
              <p>{visitor.name}</p>
              <p>{"hiii"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
