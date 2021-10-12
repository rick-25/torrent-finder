const Torrent = require('./torrents');
const URL = require('url');

function searchRequestListener(req, res) {    

    const parsedUrl = URL.parse(req.url, true);
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');

    if(!parsedUrl.query.key) {
            res.statusCode = 404;
            res.end(JSON.stringify("Invalid request"));
        return;
    }

    res.statusCode = 200;
    Torrent.search(parsedUrl.query.key)
        .then(res => JSON.stringify(res))
        .then(data => res.end(data))
        .catch(err => res.end(err))
}

module.exports.search = searchRequestListener;