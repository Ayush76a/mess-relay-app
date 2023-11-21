import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    item:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        required:true
    },
    units:{
        type:Number,
        required:true
    },
    orderedAt:{
        type:Date,
        default:Date.now()
    }
});

const TransactionModel = mongoose.model("TransactionModel", transactionSchema);

export default TransactionModel