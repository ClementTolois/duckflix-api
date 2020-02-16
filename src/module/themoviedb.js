// ! Require external node modules
require('dotenv').config();
const https = require('https');
// ! Constantes
const options = {
    hostname: 'api.themoviedb.org',
    port: 443,
    method: 'GET'
}
// ! Module functions
module.exports = {
    getLatest() {
        return new Promise((resolve) => {
            // * Set options
            let reqOptions = options;
            reqOptions.path = `/3/movie/latest?api_key=${process.env.TMDB_API_KEY}&language=en`;
            // * Send request
            sendRequest(reqOptions).then(res => {
                resolve(res);
            }).catch(err => {
                resolve(err);
            })
        })
    },
    getPopular() {
        return new Promise((resolve) => {
            // * Set options
            let reqOptions = options;
            reqOptions.path = `/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en`;
            // * Send request
            sendRequest(reqOptions).then(res => {
                resolve(res);
            }).catch(err => {
                resolve(err);
            })
        })
    },
    getTopRated() {
        return new Promise((resolve) => {
            // * Set options
            let reqOptions = options;
            reqOptions.path = `/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en`;
            // * Send request
            sendRequest(reqOptions).then(res => {
                resolve(res);
            }).catch(err => {
                resolve(err);
            })
        })
    },
    getGenreList(){
        return new Promise((resolve) => {
            console.log('>>> 2 <<<')
            // * Set options
            let reqOptions = options;
            reqOptions.path = `/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en`;
            // * Send request
            sendRequest(reqOptions).then(res => {
                console.log('>>> 3 <<<')
                resolve(res);
            }).catch(err => {
                resolve(err);
            })
        })  
    },
    discoverMovie(){
        return new Promise((resolve) => {
            // * Set options
            let reqOptions = options;
            reqOptions.path = `/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en`;
            // * Send request
            sendRequest(reqOptions).then(res => {
                resolve(res);
            }).catch(err => {
                resolve(res);
            })
        })        
    },
    keywordSearch(req) {
        return new Promise((resolve) => {
            // * Set options
            let reqOptions = options;
            reqOptions.path = `/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en&query=${req.split(' ')}`;
            // * Send request
            sendRequest(reqOptions).then(res => {
                resolve(res);
            }).catch(err => {
                resolve(err);
            })
        })
    },
    getMovieDetails(req) {
        return new Promise((resolve) => {
            // * Set options
            let reqOptions = options;
            reqOptions.path = `/3/movie/${req}?api_key=${process.env.TMDB_API_KEY}&language=en&query=${req}`;
            // * Send request
            sendRequest(reqOptions).then(res => {
                resolve(res);
            }).catch(err => {
                resolve(err);
            })
        })
    },
    getMovieReviews(req) {
        return new Promise((resolve) => {
            // * Set options
            let reqOptions = options;
            reqOptions.path = `/3/movie/${req}/reviews?api_key=${process.env.TMDB_API_KEY}&language=en&query=${req}`;
            // * Send request
            sendRequest(reqOptions).then(res => {
                resolve(res);
            }).catch(err => {
                resolve(res);
            })
        })
    },
    discoverMoviebyGenre(req){
        return new Promise((resolve) => {
            // * Set options
            let reqOptions = options;
            reqOptions.path = `/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${req}`;
            // * Send request
            sendRequest(reqOptions).then(res => {
                resolve(res);
            }).catch(err => {
                resolve(err);
            })
        })  
    },
    getSimilarMovies(req) {
        return new Promise((resolve) => {
            // * Set options
            let reqOptions = options;
            reqOptions.path = `/3/movie/${req}/similar?api_key=${process.env.TMDB_API_KEY}&language=en&query=${req}`;
            // * Send request
            sendRequest(reqOptions).then(res => {
                resolve(res);
            }).catch(err => {
                resolve(res);
            })
        })
    }
}
// ! Private functions
function sendRequest(options) {
    return new Promise((resolve, reject) => {
        let req = https.request(options, res => {
            if (res.statusCode !== "200") {
                res.on('data', d => {
                    let buf = Buffer.from(d);
                    let string = buf.toString();
                    try {
                        let res = JSON.parse(string);
                        resolve(res);
                    } catch(error) {
                        reject(error)
                    }
                })
            } else {
                reject(res.statusCode);
            }
        })
        req.on('error', error => {
            reject(error);
        })
        req.end();
    })
}