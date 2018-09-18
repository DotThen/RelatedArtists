let mysql = require('mysql');
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'artists'
});


const getRelatedArtists = function(showArtist) {
    let randomId = Math.floor(Math.random() * Math.floor(100));
    connection.query(`select artist_name, artistid, listeners, artist_image, popularSong from artist where artistid in (select related_artist_id from relatedartists where main_artist_id = (select artistid from artist where artistid = 10))`, function(error, result){
        if (error) {
            console.log('db query error');
            showArtist(error, null);
        } else {
        console.log('db query success');
        showArtist(null, result);
        }
    })
};

    /*
    connection.query(`select artist_name, artistid, listeners from artist where artistid in (select related_artist_id from relatedartists where main_artist_id = (select artistid from artist where artistid = ${randomId}))`, function(error, result, fields) {
        if (error) {
            getRelatedArtists(error);
        } else {

            console.log(result);
            getRelatedArtists(null, result);
        }
    });
    */

//select * from relatedartists where main_artist_id = 10;+-----+-------------------+----------------+
// select artist_name, artistid, listeners from artist  where artistid in (select related_artist_id from relatedartists where main_artist_id= (select artistid from artist where artist_name= 'Ms. Rick Leuschke'));

module.exports.getRelatedArtists = getRelatedArtists;
