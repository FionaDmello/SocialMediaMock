const express = require ("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
// to handle file upload locally
const multer =require("multer");
const path=require("path");

const authRoute = require("./routes/auth");
const userRoute =  require("./routes/users");
const postRoute = require("./routes/posts");

dotenv.config();

// For connection of DB using mongoose
mongoose.connect(
    process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => {console.log("Connected to MongoDB")}
);

// to make frontend fetch images saved to the server side storage
// if a request is made to some url with /images, it will directly go to the defined dir
app.use("/images", express.static(path.join(__dirname, 'Public/UserUploads')))

// Middlewares
// Look at documentation of below to understand what they do
app.use(express.json()); 
app.use(helmet());
app.use(morgan("common"));

// api to upload media locally for this app
// this is quickfix. Ideally, upload should be linked to s3/firebase
// and handled accordingly
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "Public/UserUploads");
    },
    filename:(req,file,cb)=>{
        // name of file will come from frontend
        cb(null,file.originalname)
    },
});

const upload = multer({storage});

app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
        return res.status(200).json("File uploaded successfully")
    }catch(err){
        console.log("Error while uploading media",err);
        res.status(500).json(err)
    }
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(9900, () => {
    console.log("LB social media server is running");
})