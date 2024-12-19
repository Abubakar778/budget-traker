import Transaction from "../models/transaction.js";

// GET
export const getTransactions = async (req, res, next) => {
  const transactions = await Transaction.find();
  return res.status(200).json(transactions);
};

// GET chart data
export const getChartData = async (req, res, next) => {
  const chartData = await Transaction.aggregate([
    {
      $match: { type: "expense" },
    },
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        totalAmount: 1,
      },
    },
  ]);

  return res.status(200).json(chartData);
};

// POST
export const addTransaction = async (req, res, next) => {
  const data = req.body;

  const newTransaction = new Transaction(data);
  await newTransaction.save();
  return res.status(201).json(newTransaction);
};

// DELETE
export const deleteTransaction = async (req, res, next) => {
  const { id } = req.params;
  const transaction = await Transaction.findByIdAndDelete(id);
  res.status(200).json(transaction);
};
