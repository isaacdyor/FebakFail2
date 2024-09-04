import { ConversationDetail } from "./conversation-detail";
import { ConversationList } from "./conversation-list";

export const Chat = () => {
  return (
    <div className="flex h-full w-full">
      <ConversationList />
      <ConversationDetail />
    </div>
  );
};
