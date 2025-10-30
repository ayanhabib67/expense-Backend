// import mongoose from "mongoose";
// // import UserModel from "./Usermodel";

// const expSchema = new mongoose.Schema({
//     expTitle: {
//         type: String,
//     },
//     amount: {
//         type: Number,
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "user",
//     }
// });


// const Expmodel = mongoose.model("expense", expSchema);
// export default Expmodel;










import mongoose from "mongoose";

const secma = new mongoose.Schema({
  category: String,
  incTitle: String,
  amount: Number,
  date: { type: Date, default: Date.now },
  userId: String, // ✅ lowercase same as frontend
});

const expModel = mongoose.model("expence", secma);
export default expModel;