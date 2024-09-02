import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgTableCreator,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

export const createTable = pgTableCreator((name) => `${name}`);

export const visitors = createTable("visitor", {
  id: uuid("id").primaryKey().notNull(),
  userId: uuid("user_id").notNull(),
  name: text("name"),
  active: boolean("active").notNull().default(true),
  currentPage: text("current_page"),
  lastSeen: timestamp("last_seen", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const insertVisitor = createInsertSchema(visitors);
export const selectVisitor = createSelectSchema(visitors);
export type Visitor = z.infer<typeof selectVisitor>;

export const conversations = createTable(
  "conversation",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    visitorId: uuid("visitor_id")
      .notNull()
      .references(() => visitors.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => sql`CURRENT_TIMESTAMP`,
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
