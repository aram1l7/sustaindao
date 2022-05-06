const axios = require('axios');
const express = require('express')
const router = express.Router();
require('dotenv').config()
router.get('/twitter/sustaindao', async (req,res) =>  {
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


router.get('/tweets', async (req,res) =>  {
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


module.exports = router;