const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExampleSchema = new Schema({
  property1: String,
  property2: String,
});

const Example = mongoose.model("Example", ExampleSchema);

module.exports = Example;
