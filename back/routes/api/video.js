const express = require('express');
const router = express.Router();
const { Video } = require("../../models/Video");

//=================================
//             User
//=================================


router.get("/getVideos", (req, res) => {

    Video.find()
        
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })

});


router.post("/getVideo", (req, res) => {

    Video.findOne({ "_id" : req.body.videoId })
    
    .exec((err, video) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, video })
    })
});


module.exports = router;