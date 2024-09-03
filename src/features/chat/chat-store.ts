// src/features/chat/chat-store.ts
"use client";

import { type ConversationWithVisitor, type Visitor } from "@/server/db/types";
import { createStore } from "zustand";

export interface ChatState {
  activeVisitors: Visitor[];
  conversations: ConversationWithVisitor[];
  activeConversation: ConversationWithVisitor | null;
  detailInputRef: React.RefObject<HTMLInputElement> | null;
  setActiveVisitors: (visitors: Visitor[]) => void;
  setConversations: (conversations: ConversationWithVisitor[]) => void;
  setActiveConversation: (conversation: ConversationWithVisitor) => void;
  addActiveVisitor: (visitor: Visitor) => void;
  removeActiveVisitor: (visitorId: string) => void;
  addConversation: (conversation: ConversationWithVisitor) => void;
  updateConversation: (
    conversationId: string,
    updates: Partial<ConversationWithVisitor>,
  ) => void;
  setDetailInputRef: (ref: React.RefObject<HTMLInputElement> | null) => void;
  focusDetailInput: () => void;
}

export interface ChatStoreProps {
  activeVisitors: Visitor[];
  conversations: ConversationWithVisitor[];
}

export type ChatStore = ReturnType<typeof createChatStore>;

export const createChatStore = (initProps: ChatStoreProps) => {
  return createStore<ChatState>()((set, get) => ({
    ...initProps,
    activeConversation: initProps.conversations[0] ?? null,
    detailInputRef: null,
    setActiveVisitors: (visitors) => set({ activeVisitors: visitors }),
    setConversations: (conversations) => set({ conversations }),
    setActiveConversation: (conversation) =>
      set({ activeConversation: conversation }),
    addActiveVisitor: (visitor) =>
      set((state) => ({
        activeVisitors: [...state.activeVisitors, visitor],
      })),
    removeActiveVisitor: (visitorId) =>
      set((state) => ({
        activeVisitors: state.activeVisitors.filter((v) => v.id !== visitorId),
      })),
    addConversation: (conversation) =>
      set((state) => ({
        conversations: [...state.conversations, conversation],
      })),
    updateConversation: (conversationId, updates) =>
      set((state) => ({
        conversations: state.conversations.map((conv) =>
          conv.id === conversationId ? { ...conv, ...updates } : conv,
        ),
      })),
    setDetailInputRef: (ref) => set({ detailInputRef: ref }),
    focusDetailInput: () => {
      const { detailInputRef } = get();
      detailInputRef?.current?.focus();
    },
  }));
};
