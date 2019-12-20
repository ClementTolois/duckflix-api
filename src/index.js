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
            socket.emit('getLatest', res)
        })
    })
    // ! GET POPULAR
    socket.on('getPopular', () => {
        theMovieDB.getPopular().then(res => {
            socket.emit('getPopular', res)
        })
    })
    // ! GET TOP RATED
    socket.on('getTopRated', () => {
        theMovieDB.getTopRated().then(res => {
            socket.emit('getTopRated', res)
        })
    })
    // ! KEYWORD SEARCH
    socket.on('keywordSearch',(req) => {
        theMovieDB.keywordSearch(req).then(res => {
            socket.emit('keywordSearch', res)
        })
    })
    // ! GET MOVIE DETAILS
    socket.on('getMovieDetails', (req) => {
        
    })
})