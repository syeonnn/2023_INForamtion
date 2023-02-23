const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    mean: {
        type:String,
        maxlength:50,
    },
    filePath : {
        type: String,
    } 
})


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }