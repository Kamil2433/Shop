const mongoose = require("mongoose");
const { Schema } = mongoose;

const ListSchema = new Schema({
  
  User: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  items: [{ type: Schema.Types.ObjectId, ref: "Items" }],
});

module.exports = mongoose.model("list", ListSchema);
