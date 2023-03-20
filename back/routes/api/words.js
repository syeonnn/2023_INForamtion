const express = require("express");
const router = express.Router();
const { Word } = require("../../models/Word");

//=================================
//             words
//=================================


// 전체 단어 리스트 불러오기
router.get("/getWords", (req, res) => {
    Word.find({})
        .exec((err, words) => {
            if (err) return res.status(400).send(err);

            res.status(200).json({
                success: true,
                words
            })
        })
})

// 특정 단어 정보 불러오기 요청
router.post("/getWord", (req, res) => {
    Word.findOne({ "id" : req.body.id })
        .exec((err, word) => {
            if (err) return res.status(400).send(err);

            res.status(200).json({
                success: true,
                word
            })
        });
});

module.exports = router;