const clients = require('./clients')
const schemas = require('./schemas')
const { desc, eq } = require('drizzle-orm')

async function newLead({ email }) {
    const db = await clients.getDrizzleDbClient()
    const results = await db.insert(schemas.LeadTable).values({
        email: email
    }).returning()
    if (results.length === 1) {
        return results[0]
    }
    return results
}

async function listLead() {
    const db = await clients.getDrizzleDbClient()
    const results = await db.select().from(schemas.LeadTable)
        .orderBy(desc(schemas.LeadTable.createdAt))
        .limit(10)
    return results
}

async function getLead() {
    const db = await clients.getDrizzleDbClient()
    const results = await db.select().from(schemas.LeadTable)
        .where(eq(schemas.LeadTable.id, id))
    if(results.length === 1){
        return results[0]
    }
    return null
}

module.exports.newLead = newLead
module.exports.listLead = listLead
module.exports.getLead = getLead