const serverless = require("serverless-http");
const express = require("express");
const { getDbClient } = require('./db/clients')
const crud = require('./db/crud')
const validators = require('./db/validators')

const app = express();
const STAGE = process.env.STAGE || 'prod'

app.use(express.json())

app.get("/", async (req, res, next) => {
  const sql = await getDbClient()
  const [dbNowResults] = await sql`select now();`
  const delta = (Date.now() - dbNowResults.now.getTime()) / 100
  return res.status(200).json({
    delta: delta,
    stage: STAGE,
    dev: 'David Cortes U'
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path",
  });
});

app.get("/leads", async (req, res, next) => {
  const results = await crud.listLead()
  return res.status(200).json({
    results: results
  });
});

app.post("/leads", async (req, res, next) => {
  const postData = await req.body
  const { data, hasError, message } = await validators.validateLead(postData)

  if (hasError === true) {
    return res.status(400).json({
      message: message ? message : "Invalid Request, please try again"
    })
  } else if (hasError === undefined) {
    return res.status(500).json({
      message: "Server Error"
    })
  }

  const result = await crud.newLead(data)
  return res.status(200).json({
    results: result
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// server-full-app
/* app.listen(3000, () => {
  console.log("running on 3000 port")
}) */

module.exports.handler = serverless(app);
