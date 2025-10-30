


import express from "express"
import cors from "cors"
import mongoose, { startSession } from "mongoose"
import jwd from "jsonwebtoken"
import authMiddleware from "./middleware/auth.js"
import bcrypt from "bcryptjs"

// import UserModel from "./models/Usermodel.js"
import Expmodel from "./models/ExpenseModel.js"
import UserModel from "./models/Usermodel.js"
import incomeModel from "./models/ExpenseModel.js"
// import incomeModel from "./models/IncomeModel.js"
// import UserModel from "./models/Usermodel.js"



let app = express()
let PORT = 5000 || process.env.PORT
let URI = "mongodb+srv://ayanhabib7455:zxczxczxc@cluster0.rlhtp6h.mongodb.net/?appName=Cluster0"


mongoose
    .connect(URI)
    .then((res) => console.log("mongoDB connected"))
    .catch((err) => console.log("MongoDb Error:", err.message));


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());



app.post("/signup", async (request, response) => {

    try {

        let {  email,  password } = request.body;


        console.log("real password", password);


        if (!email || !password) {
            return response.json({
                message: "Required fields are missing"
            })

        }


        let user = await UserModel.findOne({ email })
        console.log("user", user);

        if (user) {
            return response.json({
                meaasge: "email Addres alerady exist",
                status: false
            })
        }

        let hashPassword = await bcrypt.hash(password, 10);

        const userObj = {
            ...request.body,
            password: hashPassword,
        };




        await UserModel.create(userObj)

        response.json({
            message: "user sucessfully registered!",
            status: true
        })


        console.log("Email", request.body);



    } catch (error) {
        response.json({
            message: error.message || "Something want wrong",
            status: false
        })

    }

})




    

app.post("/login", async (request, response) => {
    try {
      let { email, password } = request.body;
  
     
      let user = await UserModel.findOne({ email });
  
     
      if (!user) {
        return response.json({
          message: "Email not found",
          status: false,
        });
      }
  
      console.log("id", user._id.toString());
  
     
      let comparePass = await bcrypt.compare(password, user.password);
      console.log("comparePass", comparePass);
  
      if (!comparePass) {
        return response.json({
          message: "Email or Password invalid",
          status: false,
        });
      }
  
    
      let data = { _id: user._id };
      let PRIVATE_KEY = "Ayabhabib7455";
      let token = jwd.sign(data, PRIVATE_KEY, { expiresIn: "24h" });
  
      console.log("token", token);
  
      
      return response.json({
        message: "User successfully logged in",
        status: true,
        token,
        userId: user._id.toString(),
      });
    } catch (error) {
      console.log("Error:", error.message);
  
      response.json({
        message: error.message || "Something went wrong",
        status: false,
      });
    }
  });
  







app.post("/createIncome", async (request, response) => {
    try {
      console.log("Incoming data:", request.body);
  
      const newIncome = new incomeModel(request.body);
      await newIncome.save(); 
  
      response.json({
        message: "Income created successfully!",
        status: true,
        data: newIncome,
      });
    } catch (error) {
      response.json({
        message: error.message,
        status: false,
      });
    }
  });
  
















  app.post("/getIncome", async (req, res) => {
    try {
      const { userId } = req.body; 
  
      console.log("User ID from frontend:", userId);
  
      const incomes = await incomeModel.find({ userId });
  
      res.json({
        message: "Incomes fetched successfully",
        status: true,
        data: incomes,
      });
    } catch (error) {
      res.json({
        message: error.message,
        status: false,
      });
    }
  });
  



app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})