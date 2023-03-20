const mongoose = require('mongoose');

const wordSchema = mongoose.Schema({
    id : { // 단어 (영어)
        type:String,
        required: true,
        unique: true
    },
    mean : { // 단어 (한국어)
        type:String,
        required: true,
    },
    description : { // 수형 설명
        type: String,
        required: true
    },
    imgName : { // 이미지 파일명
        type: String,
        required: true
    }, 
    exList : [ // 예시 문장
        {
            type: String,
            maxlength:100
        }
    ]
})


const Word = mongoose.model('Word', wordSchema);

module.exports = { Word }