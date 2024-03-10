const mongoose = require('mongoose')
const { Schema } = mongoose;

const ItemSchema = new Schema({
  name:{
    type:String,
    require:true
  }


})

module.exports=mongoose.model('items',ItemSchema);

