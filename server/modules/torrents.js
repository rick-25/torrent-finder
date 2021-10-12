const TorrentSearchApi = require('torrent-search-api');

TorrentSearchApi.enableProvider('ThePirateBay');


async function search(search_key, limit = 15) {
    limit = Math.min(20, limit);
    return await TorrentSearchApi.search(search_key, 'All', limit);
}

exports.search = search;