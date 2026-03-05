import express, { response } from "express";
import { dbConnect } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config()
import authRoute from "./routes/authRoutes.js";
import cors from "cors"
import router from "./routes/adminRoutes.js";
import recpRouter from "./routes/receptionRoutes.js";


const app = express()
const port = 5000  

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

dbConnect();
app.use("/api/auth",authRoute);
app.use("/api/admin", router);
app.use("/api/reception", recpRouter);
// app.use("/api/student",studentDashboardRoutes);

app.post("/apitest", (request, response) => {
     console.log("server running successfully");
    response.send("connected");
})

app.listen(port, () => console.log(`server running on port ${port}`));


