// Database schema for workshop enrollments and contact feedback
// Using Drizzle ORM with PostgreSQL

import { pgTable, serial, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core';

// Workshop enrollments table
export const workshopEnrollments = pgTable('workshop_enrollments', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  workshop: varchar('workshop', { length: 255 }).notNull(),
  preferredDate: varchar('preferred_date', { length: 255 }),
  message: text('message'),
  locale: varchar('locale', { length: 10 }).notNull().default('en'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Contact/Feedback submissions table
export const contactSubmissions = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  message: text('message').notNull(),
  locale: varchar('locale', { length: 10 }).notNull().default('en'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Admin users table for user management
export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: varchar('role', { length: 50 }).notNull().default('admin'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastLogin: timestamp('last_login'),
});

// TypeScript types
export type WorkshopEnrollment = typeof workshopEnrollments.$inferSelect;
export type InsertWorkshopEnrollment = typeof workshopEnrollments.$inferInsert;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;
