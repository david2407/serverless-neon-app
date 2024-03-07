
const { neon, neonConfig } = require("@neondatabase/serverless"); //commonjs
const { drizzle } = require('drizzle-orm/neon-http')
const secret = require('../lib/secrets')

async function getDbClient() {
    const dbUrl = await secret.getDatabaseUrl()
    neonConfig.fetchConnectionCache = true
    const sql = neon(dbUrl)
    return sql
}

async function getDrizzleDbClient() {
    const sql = await getDbClient()
    return drizzle(sql)

}

module.exports.getDbClient = getDbClient
module.exports.getDrizzleDbClient = getDrizzleDbClient