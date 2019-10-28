import path from "path";
import express from "express";
import "./config";
// import "./databases/mongo-connect";
import collections from "./routes/collections";
import quotes from "./routes/quotes";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use('/api/collections', collections);
app.use('/api/quotes', quotes);

if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static(path.resolve(__dirname, '..', 'public')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
    });
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server listening on port ${port}`));