import { ConversationDetail } from "./conversation-detail";
import { ConversationList } from "./conversation-list";

export const Chat = () => {
  return (
    <div className="flex w-full">
      <ConversationList />
      <ConversationDetail />
    </div>
  );
};
