import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/features/auth/use-user";
import { useChatStore } from "@/features/chat/use-chat";
import { generateConversation } from "@/features/chat/utils/generateConversation";
import { type Visitor } from "@/server/db/types";

export const ConversationSuggestion: React.FC<{ visitor: Visitor }> = ({
  visitor,
}) => {
  const setActiveConversation = useChatStore(
    (state) => state.setActiveConversation,
  );

  const { user } = useUser();

  const conversation = generateConversation(visitor, user.id);

  return (
    <div
      onMouseDown={() => {
        console.log("clicked");
        setActiveConversation(conversation);
      }}
      className="flex items-center gap-2 border-b p-2 hover:cursor-pointer hover:bg-secondary"
    >
      <Avatar className="h-6 w-6">
        <AvatarFallback className="border bg-background text-sm">
          {visitor.name
            ? visitor.name.length > 0 && visitor.name[0]?.toUpperCase()
            : "U"}
        </AvatarFallback>
      </Avatar>

      <p>{visitor.name ?? "Unknown"}</p>
      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
    </div>
  );
};
