import { Chat } from "@/features/chat";
import { ChatProvider } from "@/providers/chat-provider";
import { api } from "@/trpc/server";

export default async function ChatPage() {
  const activeVisitors = (await api.visitors.getActive()) ?? [];
  const conversations = (await api.conversations.getAll()) ?? [];

  return (
    <ChatProvider activeVisitors={activeVisitors} conversations={conversations}>
      <Chat />
    </ChatProvider>
  );
}
