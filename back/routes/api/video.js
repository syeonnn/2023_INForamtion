const express = require('express');
const router = express.Router();
const { Video } = require("../../models/Video");
const { auth } = require("../../middleware/auth");

//=================================
//             video
//=================================

// DB 내 모든 비디오 정보 불러오기 
router.get("/getVideos", (req, res) => {
    Video.find()
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos });
        });
});

// DB에서 한 비디오 정보 불러오기
router.post("/getVideo", (req, res) => {
    Video.findOne({ "_id" : req.body.videoId })
        .exec((err, video) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, video });
        });
});


module.exports = router;