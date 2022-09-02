console.clear();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("./database")();
require("dotenv").config();

app.use(cors());
app.use(express.json());

// app.use(fileUpload({ useTempFiles: true }));
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/api", require("./routes/file-upload-routes"));

// app.use("/api", require("./routes/upload"));
app.use("/api/evidance", require("./routes/evidance"));
app.use("/api/evidancetype", require("./routes/evidancetype"));
app.use("/api/doc", require("./routes/doc"));

app.listen(process.env.PORT || 8080, () =>
  console.log(
    `server is listening on url http://localhost:${process.env.PORT || 8080}`
  )
);
