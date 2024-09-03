import { type z } from "zod";
import {
  type selectConversation,
  type selectVisitor,
} from "@/server/db/schema";

export type Visitor = z.infer<typeof selectVisitor>;

export type Conversation = z.infer<typeof selectConversation>;

export type ConversationWithVisitor = Conversation & { visitor: Visitor };
