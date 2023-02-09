const router = require("express").Router();
const multiparty = require("multiparty");
const url = require("url");
const fs = require("fs");
const path = require("path");

router.get("/index", (req, res) => {
    var queryData = url.parse(req.url, true).query; 
    var video_id = `${queryData.id}`;

    console.log("video_id: ", video_id);

    res.render("video", { "video_id" : video_id })
    // res.sendFile(path.resolve(__dirname+"/../views/index.ejs"));
});

router.get("/src", (req, res) => {
    const queryData = url.parse(req.url, true).query; 
    const filePath = `./resource/${queryData.id}`; // 쿼리 스트링으로 원하는 파일 읽어올 수 있게
    
    const stat = fs.statSync(filePath); // 파일 정보 가져오기 (크기, 생성한 날짜, 수정한 날짜)
    const fileSize = stat.size; // 파일 크기
    const range = req.headers.range;
    console.log(range);

    if (!range) {
        const header = { "Content-Type" : "video/mp4" }
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
        // const start = Number(range.replace(/\D/g, ""));
        // const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

        const header = {
            "Content-Range" : `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges" : "bytes",
            "Content-Length" : fileSize -1,
            "Content-Type" : "video/mp4",
        };
        res.writeHead(206, header); // 206 : partial Content (데이터가 여럿으로 쪼개져 다음 데이터가 존재함을 알려줌, Content-Range 헤더가 필수적)
    
        const videoStream = fs.createReadStream(filePath, { start, end });
        videoStream.pipe(res);
    }
});

// 음악 업로드
router.post("/", (req, res) => {
    const form = new multiparty.Form();
    form.on("error", err => res.status(500).end());
    form.on("part", (part) => {
        // file이 아닌 경우 skip
        if (!part.filename) {
            return part.resume();
        }
        const fileStream = fs.createWriteStream(`./resource/${part.filenmae}`);
        part.pipe(fileStream);
    });
    form.on("close", () => res.end());
    form.parse(req); 
});


module.exports = router;