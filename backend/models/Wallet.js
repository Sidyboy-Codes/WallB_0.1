import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  user_id:{
    type: String,
    required: true
  },
  
  wallet_name: {
    type: String,
    required: true,
  },

  wallet_desc: {
    type: String
  },

  wallet_initial_amt: {
    type: Number,
    required: true,
  },
});
