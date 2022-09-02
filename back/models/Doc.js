const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const docSchema = new Schema(
  {
    file: {
      type: Object,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("doc", docSchema);
