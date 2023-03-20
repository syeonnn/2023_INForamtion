const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    id : { // 단어 (영어)
        type:String,
        required: true,
        unique: true
    },
    fileName : {
        type: String,
        required: true
    },
    mean: { // 단어 (한글)
        type:String,
        maxlength:50,
        required: true
    },
    description: {
        type: String,
    }
})


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }