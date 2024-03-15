

# Serverless Node Express API on AWS with Neon postgreqsl database

This app create a serverkess API deployed on AWS lambda services

Use Neon posgresql project to store database info

Use github actions pipeline to deploy and validate some steps automatically

## Usage

You need to provide AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, NEON_API_KEY of yours account to able deployment and database.

If you are running locally, you can put it on .env stage file


You can get your dbUrl from neonctl command, this example get dbUrl from dev branch

```
neonctl connection-string --branch dev
```

You have to use a cli command tsx src/cli/putSecret.js <stage> <dbUrl> (replace stage and dburl) to store neon database url by stage on AWS parama store

Example:

```
tsx src/cli/putSecret.js dev exampledburl.com
```

if connection string has / symbol you have to put it on a variant and then set this 

```
export STAGE=$(neonctl connection-string --branch dev) 
npx tsx src/cli/putSecret.js dev $STAGE     
```

Remember every neon db branch has a different dburl so you need to set up one dbUrl for every stage you create in your database


### Deployment

Install dependencies with:

```
npm install
```

and then deploy on prod with:

```
npm run deploy
```

After running deploy, you should see output similar to:

```bash
Deploying aws-node-express-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-express-api-project-dev (196s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: aws-node-express-api-project-dev-api (766 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/delta
```

Which should result in the following response:

```
{"deltaResponse": "1", "stage": "prod"}
```

Calling the `/leads` path with:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/leads
```

Should result in the following response:

```bash
{"results":"users array"}
```

If you try to invoke a path or method that does not have a configured handler, e.g. with:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/nonexistent
```

You should receive the following response:

```bash
{"error":"Not Found"}
```

### Local development

It is also possible to emulate API Gateway and Lambda locally by using `serverless-offline` plugin. In order to do that, execute the following command:

```bash
deploy-dev-stage
```

It will add the `serverless-offline` plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`.

After installation, you can start local emulation with:

```
npm run dev
```

