import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import type { z } from "zod";
import { tlgPage } from "#/db/schema.ts";
import { image } from "#/features/image/schema";

export const tlgSaler = sqliteTable("tlg_saler", {
	id: integer("id").primaryKey(),

	name: text("name").notNull().default(""),
	avatar: integer("avatar").references(() => image.id),
	phone: text("phone").notNull().default(""),
	wechat: text("wechat").notNull().default(""),
	wechatQrcode: integer("wechat_qrcode").references(() => image.id),
	email: text("email").notNull().default(""),
	state: integer({ mode: "boolean" }).default(false),

	pageId: integer("page_id").references(() => tlgPage.id),
});

export const tlgSalerInsertSchema = createInsertSchema(tlgSaler);
export const tlgSalerSelectSchema = createSelectSchema(tlgSaler);
export const tlgsalerUpdateSchema = createUpdateSchema(tlgSaler);

export type TlgSalerInsert = z.infer<typeof tlgSalerInsertSchema>;
export type TlgSalerSelect = z.infer<typeof tlgSalerSelectSchema>;
export type TlgSalerUpdate = z.infer<typeof tlgsalerUpdateSchema>;
