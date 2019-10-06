import express from "express";
import "./config";
import "./databases/mongo-connect";
import collections from "./routes/collections";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use('/api/collections', collections);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server listening on port ${port}`));