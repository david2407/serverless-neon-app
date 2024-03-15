// tsx src/cli/putSecrets.js <stage> <dbUrl>
require('dotenv').config()
const secrets = require('../lib/secrets')

const args = process.argv.slice(2)

if (args.length !== 2) {
    console.log('Usage: tsx src/cli/putSecret.js <stage> <dbUrl>')
    process.exit(1)
}

if (require.main === module) {
    console.log("Updating database Url!")
    const [stage, dbUrl] = args
    secrets.putDatabaseUrl(stage, dbUrl)
        .then(val => {
            console.log(val)
            console.log(`Secret set`)
            process.exit(0)
        }).catch(error => {
            console.log(`Secret not set ${error}`)
            process.exit(1)
        })


}