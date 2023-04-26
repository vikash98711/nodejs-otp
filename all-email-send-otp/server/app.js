
import express from "express";
import cors from "cors";
import connection from "./database/db.js";
// import router from "./Routes/router.js";
import multer from 'multer';
import path from 'path';
import bodyparser from 'body-parser';
import fs from 'fs';
import csv from 'fast-csv';
import mysql from 'mysql';
import { fileURLToPath } from "url";
import { log } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
import nodemailer from "nodemailer";

const port = 8080;


// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(express.json())
app.use(cors());


// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//     callBack(null, '/uploads')    
//     },
//     filename: (req, file, callBack) => {
//     console.log("multerfile",file);
//     callBack(null, file.fieldname + '-' + Date.now() + ".csv")
//     }
//     })
//     var upload = multer({
//     storage: storage
//     });




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        // cb(null, `${Date.now()}-${file.originalname}`) 
        cb(null, `${file.fieldname}-${Date.now()}.csv`) 
    }
  })
const upload = multer({ storage: storage })

    app.post('/api/uploadfile', upload.single("uploadfile"), (req, res) =>{
        // console.log("reqfile",req.file);
        // console.log("body",req.body)
        // res.status(200)
    UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename);
    res.json({
    'msg': 'File uploaded/import successfully!', 'file': req.file
    });
    });
    function UploadCsvDataToMySQL(filePath){
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = csv
    .parse()
    .on("data", function (data) {
    csvData.push(data);
    })
    .on("end", function () {
    // Remove Header ROW
    csvData.shift();
    // Open the MySQL connection
    // connection.connect((error) => {
    // if (error) {
    // console.error(error);
    // } else {
    let query = 'INSERT INTO uploadfiles ( name, age, email) VALUES ?';
    connection.query(query, [csvData], (error, response) => {
    console.log(error || response);
    // });
    // }
    }
    );
    // delete file after saving to MySQL database
    // -> you can comment the statement to see the uploaded CSV file.
    fs.unlinkSync(filePath)
    });
    stream.pipe(csvStream);
    }







const uploads = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb)
        {
            cb(null,"uploads")

        },
        filename:function(req,file,cb)
        {
            cb(null,file.fieldname + "-" +Date.now() + ".csv")
        }
    })
}).single('files')

app.post("/upload", uploads ,(req,res)=>{
 const error = res.send("file upload")
// console.log("sucess");
if (error) {
    console.error(error);
} else {
    let query = 'INSERT INTO uploadfiles (name, age, email) VALUES ?';
    connection.query(query, [csvData], (error, response) => {
        console.log(error || response);
    });
}
})



// get data to database in sql  

app.get("/getusers",(req,res)=>{

    connection.query("SELECT * FROM uploadfiles ",(err,result)=>{
        if(err){
            res.status(422).json("nodata available");
        }else{
            res.status(201).json(result);
        }
    })
});




// delete users api starting 

app.delete("/deleteuser/:id",(req,res)=>{

    const {id} = req.params;

    connection.query("DELETE FROM uploadfiles WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
});





// delete users api ending


// send otp to all  email users starting




app.post('/Alluseremail',(req,res)=>{
    try  {
   const data = req.body 
   console.log(data)
  //  dummy 
  const otp = `${Math.floor(1000 +Math.random() * 9000)}`
  
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
  port: 465,
  secure: true,
      auth: {
        user: 'upcloudglobal@gmail.com',
        pass: 'uyrevovawuxzotcb'
      }
    });
  
    var mailOptions = {
      from: "upcloudglobal@gmail.com",
      to:  data,
      bcc:"upcloudglobal@gmail.com",
      subject: "sending image ",
     
      html:`<h1 style="color:red;">otp send on <span style="color:blue"> ${otp} <span/></h1>`
    };
  
  
  
  
  transporter.sendMail(mailOptions, (error, info)=>{
    if (error) {
      console.log("email is not send properly",error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}catch(error){
    console.log("error while sending email",error)
  }
  
  })
  





// send otp to all  email users ending


// ckeditor post api to save item

app.post("/createcrk", (req, res) => {

    // console.log(req.body);

    const {discription } = req.body;
    console.log(discription );

    // if (!name || !email || !age || !mobile) {
    //     res.status(422).json("plz fill the all data");
    // }

    try {
        // connection.query("SELECT * FROM crkdata WHERE name = ?",name, (err, result) => {
        //     if (result) {
        //         res.status(422).json("This Data is Already Exist")
        //     } else {
                connection.query("INSERT INTO editordata SET ?", { discription }, (err, result) => {
                    if (err) {
                        console.log("err" + err);
                    } else {
                        res.status(201).json(req.body);
                    }
            //     })
            // }
        })
    } catch (error) {
        res.status(422).json(error);
    }

});



// ckeditor post api to save item 






app.listen(port, () => {

    console.log("server starts at port no :" + port);
})