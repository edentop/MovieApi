let request = require('request');
let credentials = require('../config/credentials');

const LANG = 'es-CL';
const BASEURL = 'https://api.themoviedb.org/3/';
const IMAGEBASEURL = 'https://image.tmdb.org/t/p/original/';

let search = ( movieName => {
    return new Promise( ( resolve, reject ) => {

        let options = {
            method: 'GET',
            url: `${BASEURL}search/movie/`,
            qs: {
                include_adult: false,
                page: 1,
                query: movieName,
                language: LANG,
                api_key: credentials.apiKey
            },
            body: '{}'
        };

        request( options, function ( error, response, body ) {
            if ( error ) reject ( `Error: ${error}` );

            if ( response.statusCode != 200 ) {
                reject ( { statusCode: response.statusCode } );
            }

            resolve ( JSON.parse( body ) );            
        });
    });
});

let get = ( movieId => {
    return new Promise( ( resolve, reject ) => {

        let options = {
            method: 'GET',
            url: `${BASEURL}movie/${movieId}`,
            qs: {
                language: LANG,
                api_key: credentials.apiKey
            },
            body: '{}'
        };

        request( options, function ( error, response, body ) {
            if ( error ) reject ( `Error: ${error}` );

            if ( response.statusCode != 200 ) {
                reject( { statusCode: response.statusCode } );
            }

            resolve ( JSON.parse( body ) );
        });
    });
});

let getMovieCast = ( movieId => {
    return new Promise( ( resolve, reject ) => {

        let options = {
            method: 'GET',
            url: `${BASEURL}movie/${movieId}/credits`,
            qs:{
                language: LANG,
                api_key: credentials.apiKey
            },
            body: '{}'
        };

        request( options, function ( error, response, body ) {
            if ( error ) reject(`Error: ${error}`);

            if ( response.statusCode != 200 ) {
                reject( { statusCode: response.statusCode } );
            }

            resolve( JSON.parse( body ) );
        });

    });
});


module.exports = {
    search: search,
    get: get,
    getMovieCast: getMovieCast
};