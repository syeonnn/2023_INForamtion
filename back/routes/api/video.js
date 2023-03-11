const express = require('express');
const router = express.Router();
const { Video } = require("../../models/Video");
const { auth } = require("../../middleware/auth");
const path = require("path");
const fs = require("fs");


//=================================
//             video
//=================================

// DB 내 모든 비디오 정보 불러오기 
router.get("/getVideos", (req, res) => {
    Video.find()
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);

            res.status(200).json({ 
                success: true, 
                videos 
            });
        });
});

// DB에서 한 비디오 정보 불러오기
router.post("/getVideo", (req, res) => {
    // Video.findOne({ "_id" : req.body.videoId }) // _id 로 찾기 
    const fileName = req.body.videoId + ".MOV";
    Video.findOne({ "fileName" : fileName }) // fileName 으로 찾기
        .exec((err, video) => {
            if(err) return res.status(400).send(err);
            
            res.status(200).json({ 
                success: true, 
                video 
            });
        });
});

router.get("/detail", (req, res) => {
    console.log(req.query.id);
    const filePath = path.resolve("assets", req.query.id);

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (!range) {
        const header = { "Content-Type" : "video/MOV" };
        res.writeHead(200, header);
        res.end();
    } else {
        const CHUNK_SIZE = 10**6;

        // range 헤더 파싱
        const parts = range.replace(/bytes=/, "").split("-");

        // 재생 구간 설정
        const start = parseInt(parts[0], 10); // 시작점
        const _end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1; // 빈 스트링 or 끝 점
        const end = Math.min(_end, start + CHUNK_SIZE - 1);

        const header = {
            "Content-Range" : `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges" : "bytes",
            // "Content-Length" : fileSize-1, // 206 에러 해결
            "Content-Length" : end-start+1,
            "Content-Type" : "video/MOV",
        };
        res.writeHead(206, header); // 206 : partial Content (데이터가 여럿으로 쪼개져 다음 데이터가 존재함을 알려줌, Content-Range 헤더가 필수적)
    
        const videoStream = fs.createReadStream(filePath, { start, end });
        videoStream.pipe(res);
    }
})


module.exports = router;