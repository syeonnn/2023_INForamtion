const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    fileName : {
        type: String,
        required: true
    },
    mean: {
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