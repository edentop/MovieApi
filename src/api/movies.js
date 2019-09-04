let express = require('express');
let router = express.Router();
let moviesService = require('../services/moviesService');

router.route('/movies/search/:keyword').get(function (request, response) {
    let keyword = request.params.keyword;

    moviesService.search( keyword )
        .then(data => {

            let movies = data.results.map((movie, index, array) => {
                return {
                    title: movie.title,
                    id: movie.id,
                    originalTitle: movie.original_title,
                    releaseDate: movie.release_date
                };
            });

            response.json(movies);

        })
        .catch(error => { 
            response.json({ error: error });
        });
});

router.route('/movies/:id').get( function ( request, response ) {
   let movieId = request.params.id;
   
   moviesService.get( movieId )
    .then( data => {

        let movie = {
            id: data.id,
            title: data.title,
            tagLine: data.tagline,
            originalTitle: data.original_title,
            originalLanguage: data.original_language,
            overview: data.overview,
            image: data.poster_path,
            releaseDate: data.release_date,
            spokenLanguage: data.spoken_languages.map((language, index) => {
                return {
                    codeId: language.iso_639_1,
                    name: language.name
                };
            }),
            status: data.status
        };

        response.json(movie);
    })
    .catch( error => {
        response.json( { error: error } );
    });
});

router.route('/movies/cast/:id').get( function ( request, response ) {
    let movieId = request.params.id;

    moviesService.getMovieCast( movieId )
        .then( data => {

            let movieCast = data.cast.map((character, index, array) => {
                return {
                    id: character.id,
                    castId: character.cast_id,
                    name: character.name,
                    character: character.character,
                    profileImage: character.profile_path,
                    genre: {
                        id: character.gender,
                        description: character.gender == 1 ? 'Female':'Male'
                    }
                };
            });

            response.json( movieCast );

        })
        .catch( error => {
            response.json( { error: error } );
        });
});

module.exports = router;