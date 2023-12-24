const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinanceSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  created: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const FinanceModel = mongoose.model("finance", FinanceSchema);
module.exports = FinanceModel;
