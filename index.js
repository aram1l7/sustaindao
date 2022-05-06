const axios = require('axios');
const express = require('express')
const cors = require('cors')
const path = require('path');
require('dotenv').config()
const app = express()
app.use(cors());

const PORT = process.env.PORT || 4000

let origin = '*'
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Headers',"Origin, X-Requested-With,Content-Type,Accept,Key,Access-Control-Allow-Headers,Cache-Control,Authorization")
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/twitter/sustaindao', async (req,res) =>  {
    const options = {
        headers:{
            Authorization:`Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        }
    }
    try {
        const response = await axios.get("https://api.twitter.com/2/users/1504551646608728064?user.fields=name,username,profile_image_url", options)
        if(response){
            return res.json(response.data.data)
        }
    } catch(error){
        console.log(error)
    }
})


app.get('/tweets', async (req,res) =>  {
    const options = {
        headers:{
            Authorization:`Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        }
    }
    try { 
        const response = await axios.get("https://api.twitter.com/2/users/1504551646608728064/tweets?max_results=5&tweet.fields=created_at,text,public_metrics", options)
        if(response){
            return res.json(response.data.data)
        }
    } catch(error){
        console.log(error)
    }

})
app.listen(PORT)

module.exports = app;