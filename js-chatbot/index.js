const express = require('express');
const cors = require('cors');

const scrape = require("./scrape");
const returnAnswer = require("./chat");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3001",
    credentinals: true
}))


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json({limit: '100mb'}));

app.post("/set-and-train-model", (req, res)=>{
    const company = req.body.company;
    try{
        scrape(company);
        res.status(200).json('success');
    }
    catch(err){
        res.status(500).send();
    }
})

app.post("/ask-question", (req, res)=>{
    const question = req.body.question;
    try{
        returnAnswer(question)
        .then((response)=>{
            if(response.answers.length === 0){res.status(200).json("Sorry. No relevant information found");}
            else res.status(200).json(response.answers[0].answer);
        })
        .catch((err)=>{
            throw(err);
        })
    }
    catch(err){
        res.status(500).send();
    }
})

app.listen(port,()=>{
    console.log('Server running at port '+port);
})