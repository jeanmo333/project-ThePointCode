// custom functions
const { customFunction1, customFunction2 } = require("./controller");

const express = require("express");
const router = express.Router();

// route 1
router.post("/route1", async (req, res) => {
  try {
    // handle route and call functions in controller
    customFunction1()
  } catch (error) {
    // handle errors here
  }
});

// route 1
router.post("/route2", async (req, res) => {
  try {
    // handle route and call functions in controller
    customFunction1()
  } catch (error) {
    // handle errors here
  }
});

module.exports = router;
