// ! Require external node modules
require('colors');
require('dotenv').config();
const io = require('socket.io');
// ! Require internal node modules
const theMovieDB = require('./module/themoviedb');
// ! Processing
// * Start the socket io server
console.log('API >>> '.magenta + `server listening on port ${process.env.PORT || 8080}`.green);
const server = io.listen(process.env.PORT || 8080);
// * Listening for connection
server.on('connection', (socket) => {
    console.log('API >>> '.magenta + 'a user has logged in !'.yellow);
    // ! GET LATEST
    socket.on('getLatest', () => {
        theMovieDB.getLatest().then(res => {
            socket.emit('getLatest', res);
        });
    });
    // ! GET POPULAR
    socket.on('getPopular', () => {
        theMovieDB.getPopular().then(res => {
            socket.emit('getPopular', res);
        });
    });
    // ! GET TOP RATED
    socket.on('getTopRated', () => {
        theMovieDB.getTopRated().then(res => {
            socket.emit('getTopRated', res);
        });
    });
    // ! DISCOVER MOVIE
    socket.on('discoverMovie', () => {
        theMovieDB.discoverMovie().then(res => {
            socket.emit('discoverMovie', res);
        });
    });
    // ! KEYWORD SEARCH (word or sentence)
    socket.on('keywordSearch',(req) => {
        theMovieDB.keywordSearch(req).then(res => {
            socket.emit('keywordSearch', res);
        });
    });
    // ! GET MOVIE DETAILS (movie id)
    socket.on('getMovieDetails', (req) => {
        theMovieDB.getMovieDetails(req).then(res => {
            socket.emit('getMovieDetails',res);
        });
    });
    // ! GET MOVIE REVIEWS (movie id)
    socket.on('getMovieReviews', (req) => {
        theMovieDB.getMovieReviews(req).then(res => {
            socket.emit('getMovieReviews', res);
        });
    })
    // ! GET SIMILAR MOVIES (movie id)
    socket.on('getSimilarMovies', (req) => {
        theMovieDB.getSimilarMovies(req).then(res => {
            socket.emit('getSimilarMovies', res);
        });
    })
    // ! GET GENRE LIST
    socket.on('getGenreList',(req) => {
        theMovieDB.getGenreList().then(res => {
            socket.emit('getGenreList', res)
        });
    })
    // ! GET MOVIES BU GENRE
    socket.on('discoverMoviesByGenre',(req) => {
        theMovieDB.discoverMoviebyGenre(req).then(res => {
            socket.emit('discoverMoviesByGenre',res);
        });
    })
})