"use client";

import { ChatContext } from "@/providers/chat-provider";
import { useContext } from "react";

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within an ChatProvider");
  }
  return context;
};
