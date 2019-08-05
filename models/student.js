const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const schema = new Schema({
    studentNumber:{
        type:Number,
        required:true
    },
    password:{
        type:Number,
        required:true
    },

    name:{type:String},
    surname:{type:String},
    age:{type:Number},
    degree:{type:String},
    course:{type:String}
});

const Student = mongoose.model('student',schema);
module.exports = Student;