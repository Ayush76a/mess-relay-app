import express from "express";
import { ViewTransactions, addTransaction, deleteTransaction } from "../../controllers/Admin/TransCtrl.js";

const Router = express.Router();

// add a transaction
Router.post("/admin/transactions", addTransaction);

// view all transaction
Router.get("/admin/transactions", ViewTransactions);

// delete a transaction
Router.delete("/admin/transactions/:item", deleteTransaction);


export default Router;