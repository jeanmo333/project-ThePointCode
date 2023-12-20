// necessary functions for the route operations
const Model = require("./model");

const customFunction1 = async (data) => {
  try {
    // communicate with db using model
    Model.find({})
  } catch (error) {
    throw error;
  }
};

const customFunction2 = async (data) => {
  try {
    // communicate with db
  } catch (error) {
    throw error;
  }
};

module.exports = { customFunction1, customFunction2 };
