const mongoose =  require('mongoose')

const Schema = mongoose.Schema

const Issue = new Schema({
    title:{
        type: String,
    },
    responsible:{
        type:String
    },
    description:{
        type: String
    },
    severity:{
        type: String
    },
    status:{
        type: String,
        default: 'Open'
    }
})

module.exports = mongoose.model('Issue', Issue)