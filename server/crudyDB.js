let mysql = require ('mysql');
let connection = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'artists',
});

const getRelatedArtists = function (id, cb) {
  let sqlQuery =
    `SELECT artist_name, artistid, listeners, artist_image, popularSong FROM artist 
     WHERE artistid in (SELECT related_artist_id FROM relatedartists 
     WHERE main_artist_id =` + connection.escape(id) + `)`;
  connection.query (sqlQuery, (error, result) => {
    if (error) {
      console.log ('db query error');
      cb (error, null);
    } else {
      console.log ('db query success');
      cb (null, result);
    }
  });
};

const postNewArtist = function (artist, cb) {
  let sqlQuery1 =
    `INSERT INTO artist (artist_name, listeners, artist_image, popularSong) 
     VALUES("${artist.artist_name}", "${artist.listeners}", "${artist.artist_image}", "${artist.popularSong}")`;
  let sqlQuery2 = 
     `SELECT artistID FROM artist WHERE artist_name = "${artist.artist_name}")`
  connection.query (sqlQuery1, (error, result) => {
    if (error) {
      console.log ('db query error');
      cb (error, null);
    } else {
      connection.query(sqlQuery2, (error, newArtistIndex) => {
        if (error) {
          console.log ('db query error');
          cb (error, null);
        } else {
          for (var i = 0; i < 10; i++) {
            let randomId = Math.floor(Math.random () * Math.floor (10000000));
            while (randomId === newArtistIndex) {
              randomId = Math.floor(Math.random () * Math.floor (10000000));
            }
            connection.query(
              `INSERT INTO relatedArtists (related_Artist_ID, main_Artist_ID) 
               VALUES("${i}", (SELECT artistID FROM artist WHERE artist_name = "${artist.artist_name}"))`, 
              function (error, result, fields) {
                if (error) {
                  console.error (error);
                } else {
                  console.log("Posted", i);
                  if (i === 9) {
                    console.log ('db query success');
                    cb (null, result);
                  }
                }
              }
            )
          }
        }
      })
    }
  });
};

const editArtist = function (artist, id, cb) {
  let sqlQuery =
    `UPDATE artist 
     SET artistID = "${artist.artist_name}", artist_name = "${artist.listeners}", artist_image = "${artist.artist_image}", popularSong = "${artist.popularSong}" 
     WHERE artistID = "${id}"`;
  connection.query (sqlQuery, function (error, result) {
    if (error) {
      console.log ('Edit Artist error');
      cb (error, null);
    } else {
      console.log ('Edit Artist success');
      cb (null, result);
    }
  });
};

const deleteArtist = function (id, cb) {
  let sqlQuery =
    `DELETE FROM artist WHERE artistID = "${id}"`;
  connection.query (sqlQuery, function (error, result) {
    if (error) {
      console.log ('Delete Artist error');
      cb (error, null);
    } else {
      console.log ('Delete Artist success');
      cb (null, result);
    }
  });
};

module.exports = { getRelatedArtists, postNewArtist, editArtist, deleteArtist }