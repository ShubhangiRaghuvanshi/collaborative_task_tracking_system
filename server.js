require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/User");
const taskRoutes = require("./routes/Task");
const teamRoutes = require("./routes/Team");
const http=require("http");
const server=http.createServer(app);
const socket=require("socket.io");
const io=socket(server,{
    cors:{origin:'*',}
});
io.on("connection",(socket)=>{
    console.log("New socket connection",socket.id);
    socket.on("join",(userId)=>{
 
        socket.join(userId);
    });
    socket.on("disconnect",()=>{
        console.log("User disconnected",socket.id);
    });
});
   
    


app.set("io",io);

app.use(express.json());
const PORT = 5000;
app.use(express.urlencoded({ extended: true }));
app.use('/api/user',userRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/team', teamRoutes);


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(PORT, () => {
  console.log(` Server is up and running on port ${PORT}`);
});