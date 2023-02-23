const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
   
    filePath : {
        type: String,
    },
    mean: {
        type:String,
        maxlength:50,
    }
    
})


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }