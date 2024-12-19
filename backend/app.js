import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import connectionDb from "./config/connectionDB.js";
import { globalErrorMiddleware } from "./middlewares/errorHandler.js";
import transactionRouter from "./routers/transaction.js";
import cors from "cors";

dotenv.config();
const app = express();
connectionDb();
app.use(express.json());
app.use(cors());

app.use("/api", transactionRouter);

app.use(globalErrorMiddleware);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(
    chalk.bgWhite.green.bold(
      `app is running in ${process.env.NODE_MODE} mode at port number ${port} `
    )
  );
});
