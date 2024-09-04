// src/features/chat/chat-store.ts
"use client";

import { type AutosizeTextAreaRef } from "@/components/ui/autosize-text-area";
import { type ConversationWithVisitor, type Visitor } from "@/server/db/types";
import { createStore } from "zustand";

export interface ChatState {
  activeVisitors: Visitor[];
  conversations: ConversationWithVisitor[];
  activeConversation: ConversationWithVisitor | null;
  newConversationInputRef: React.RefObject<HTMLInputElement> | null;
  newMessageInputRef: React.RefObject<AutosizeTextAreaRef> | null;
  setActiveVisitors: (visitors: Visitor[]) => void;
  setConversations: (conversations: ConversationWithVisitor[]) => void;
  setActiveConversation: (conversation: ConversationWithVisitor) => void;
  updateActiveConversation: (updates: Partial<ConversationWithVisitor>) => void;
  addActiveVisitor: (visitor: Visitor) => void;
  removeActiveVisitor: (visitorId: string) => void;
  addConversation: (conversation: ConversationWithVisitor) => void;
  updateConversation: (
    conversationId: string,
    updates: Partial<ConversationWithVisitor>,
  ) => void;
  setNewConversationInputRef: (
    ref: React.RefObject<HTMLInputElement> | null,
  ) => void;
  focusNewConversationInput: () => void;
  setNewMessageInputRef: (
    ref: React.RefObject<AutosizeTextAreaRef> | null,
  ) => void;
  focusNewMessageInput: () => void;
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
    newConversationInputRef: null,
    newMessageInputRef: null,
    setActiveVisitors: (visitors) => set({ activeVisitors: visitors }),
    setConversations: (conversations) => set({ conversations }),
    setActiveConversation: (conversation) => {
      set({ activeConversation: conversation });
      // Focus the newMessageInput after setting the active conversation
      setTimeout(() => get().focusNewMessageInput(), 0);
    },
    updateActiveConversation: (updates) =>
      set((state) => ({
        activeConversation: state.activeConversation
          ? { ...state.activeConversation, ...updates }
          : null,
      })),
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
    setNewConversationInputRef: (ref) => set({ newConversationInputRef: ref }),
    focusNewConversationInput: () => {
      const { newConversationInputRef } = get();
      newConversationInputRef?.current?.focus();
    },
    setNewMessageInputRef: (ref) => set({ newMessageInputRef: ref }),
    focusNewMessageInput: () => {
      const { newMessageInputRef } = get();
      newMessageInputRef?.current?.textArea.focus();
    },
  }));
};
