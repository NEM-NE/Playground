const express = require("express");
const spawn = require("child_process").spawn;
const router = express.Router();

router.get("/", (req, res) => {
  const process = spawn("python3", ["../scrapper/main.py"]);

  process.stdout.on("data", function (data) {
    const result = JSON.parse(data.toString());
    res.json(result);
  });

  process.stderr.on("data", function (data) {
    console.log(data.toString());
  });
});

module.exports = router;
