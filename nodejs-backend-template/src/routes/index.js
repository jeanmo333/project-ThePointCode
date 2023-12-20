const express = require("express");
const router = express.Router();

// all domains here
const domain1Routes = require("./../domains/domain1");
// const domain2Routes = require("./../domains/domain2");
// const domain3Routes = require("./../domains/domain3");

router.use("/domain1", domain1Routes);
// router.use("/domain2", domain2Routes);
// router.use("/domain3", domain3Routes);

module.exports = router;
