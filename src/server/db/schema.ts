import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgTableCreator,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const createTable = pgTableCreator((name) => `${name}`);

export const conversations = createTable(
  "conversation",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    recipientId: uuid("recipient_id").notNull(),
    recipientName: varchar("recipient_name"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (conversation) => ({
    userIdIndex: index("user_id_idx").on(conversation.userId),
  }),
);

export const insertConversation = createInsertSchema(conversations);
export const selectConversation = createSelectSchema(conversations);

export const messages = createTable(
  "message",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversations.id),
    content: text("content").notNull(),
    sentByUser: boolean("sent_by_user").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (message) => ({
    conversationIdIndex: index("conversation_id_idx").on(
      message.conversationId,
    ),
  }),
);

export const insertMessage = createInsertSchema(messages);
export const selectMessage = createSelectSchema(messages);
