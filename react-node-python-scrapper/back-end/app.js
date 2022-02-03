const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes");

//default start

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
  })
);

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번에서 대기 중`);
});

app.use("/", indexRouter);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});
