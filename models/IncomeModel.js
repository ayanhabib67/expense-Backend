


import mongoose from "mongoose";

const incSchema = new mongoose.Schema({
  category: { type: String },
  incTitle: { type: String },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
  userId:  String,
});

const incomeModel = mongoose.model("income", incSchema);
export default incomeModel;
