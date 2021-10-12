const routes = require('./modules/routes');
const express = require('express');
const path = require('path')

const PORT = process.env.PORT || 8000;

const app = express();


//For front-end static files
app.use(express.static(path.join(__dirname,"/build")));

//For torrent search api
app.get("/search", routes.search);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}, powered by ExpressJs`);
})









