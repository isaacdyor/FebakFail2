"use client";

import { type Conversation, type Visitor } from "@/server/db/schema";
import React, { createContext } from "react";

type ChatContext = {
  activeVisitors: Visitor[];
  conversations: Conversation[];
};

export const ChatContext = createContext<ChatContext | undefined>(undefined);

export const ChatProvider: React.FC<{
  children: React.ReactNode;
  activeVisitors: Visitor[];
  conversations: Conversation[];
}> = ({ children, activeVisitors, conversations }) => {
  return (
    <ChatContext.Provider value={{ activeVisitors, conversations }}>
      {children}
    </ChatContext.Provider>
  );
};
