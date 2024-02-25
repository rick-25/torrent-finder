const routes = require('./modules/routes');
const express = require('express');
const path = require('path')
const morgan = require("morgan");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan("tiny"));

//For front-end static files
/* app.use(express.static(path.join(__dirname,"/build"))); */
app.use(express.static("build"));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname,  "build", "index.html"));
});

//For torrent search api
app.get("/search", routes.search);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}, powered by ExpressJs`);
})









