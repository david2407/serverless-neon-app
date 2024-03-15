const clients = require('./clients')
const schemas = require('./schemas')
const { desc, eq } = require('drizzle-orm')

async function newUser({ email, userName }) {
    const db = await clients.getDrizzleDbClient()
    const results = await db.insert(schemas.UserTable).values({
        email: email,
        userName: userName
    }).returning()
    if (results.length === 1) {
        return results[0]
    }
    return results
}

async function listUser() {
    const db = await clients.getDrizzleDbClient()
    const results = await db.select().from(schemas.UserTable)
        .orderBy(desc(schemas.UserTable.createdAt))
        .limit(10)
    return results
}

async function getUser() {
    const db = await clients.getDrizzleDbClient()
    const results = await db.select().from(schemas.UserTable)
        .where(eq(schemas.UserTable.id, id))
    if(results.length === 1){
        return results[0]
    }
    return null
}

module.exports.newUser = newUser
module.exports.listUser = listUser
module.exports.getUser = getUser