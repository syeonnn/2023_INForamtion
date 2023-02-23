const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    filePath : {
        type: String,
        required: true
    },
    mean: {
        type:String,
        maxlength:50,
        required: true
    }  
})


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }