const { text, timestamp, pgTable } = require("drizzle-orm/pg-core");
const { serial } = require("drizzle-orm/mysql-core")


const LeadTable = pgTable('leads', {
    id: serial('id').primaryKey().notNull(),
    email: text('text').notNull(),
    description: text('desctiption').default('this is my content'),
    createdAt: timestamp('created_at').defaultNow()
});

const UserTable = pgTable('users', {
    id: serial('id').primaryKey().notNull(),
    userName: text('text').notNull(),
    email: text('text').notNull(),
    tenantId: text('text'),
    createdAt: timestamp('created_at').defaultNow()
});

module.exports.LeadTable = LeadTable
module.exports.UserTable = UserTable