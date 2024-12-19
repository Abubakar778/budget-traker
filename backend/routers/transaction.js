import express from "express";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  getChartData,
} from "../controllers/transaction.js";
import { errorHandler } from "../middlewares/errorHandler.js";

const transactionRouter = express.Router();

transactionRouter.get("/transactions", errorHandler(getTransactions));

transactionRouter.post("/transactions", errorHandler(addTransaction));

transactionRouter.delete("/transactions/:id", errorHandler(deleteTransaction));
transactionRouter.get("/chart", errorHandler(getChartData));

export default transactionRouter;
