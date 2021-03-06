import express from "express";
import path from "path";
import logger from "morgan";
import notFoundHandler from "./middleware/handlers/notfound-handler";
import serverInternalHandler from "./middleware/handlers/serverinternal-handler";
import mainRouter from "./routes/index";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

const PORT = 80;
const STATIC_PATH = express.static(path.join(__dirname, "public"));
const HTML_FILE = path.join(__dirname, "public/index.html");
const { NODE_ENV, ENV_DEV, ENV_PROD } = process.env;

if (!NODE_ENV || NODE_ENV === ENV_DEV) {
    process.env.NODE_ENV = ENV_DEV;
    console.log("--- DEVELOPMENT MODE ---");
    const { initDatabaseSync } = require("./db/db-initializer");
    initDatabaseSync();
    app.use(logger("dev"));
} else if (process.env.NODE_ENV === ENV_PROD) {
    console.log("--- PRODUCTION MODE ---");
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(STATIC_PATH);

app.get("/", (req, res) => {
    res.sendFile(HTML_FILE);
});
app.use("/", mainRouter);
app.use(notFoundHandler);
app.use(serverInternalHandler);
app.use((req, res) => {
    res.end();
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening ${PORT}...`);
});

export default app;
