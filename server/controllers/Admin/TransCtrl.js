import TransactionModel from "../../models/transaction.js"

// Post Req 
export const addTransaction = async (req, res)=>{
    try{
        const Item=await TransactionModel.create(req.body);
        // to send and save data at the backend in json form
        res.send(Item);
      }
      catch(err){
        res.send({msg: err.message});
      }
}

// Get request to see all the transactions
export const ViewTransactions = async (req, res)=>{
    try{
        const items = await TransactionModel.find();
        res.send(items);
    }
    catch(err){
        res.send({msg:err.message});
    }
}

// Delete req
export const deleteTransaction = async(req,res)=>{
    try{
        const Item = req.params.item;
        console.log(Item);
        await TransactionModel.deleteOne({item:Item});
        res.send(`Deleted Item ${Item} from Transactions`);
    }
    catch(err){
        res.send({msg:err.message});
    }
  }