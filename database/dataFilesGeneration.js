let faker = require ('faker');
let fs = require('fs');

let w = 1;

// for (var w = 1; w < 11; w++) {
  let artistsResults = [];
  for (let i = 0; i < 500000; i++) {
    artistsResults.push ({
      artist_name: faker.name.findName (),
      listeners: faker.random.number (),
      artist_image: `https://s3.amazonaws.com/spotifyphotos/${i % 39 + 1}.jpg`,
      popularSong: faker.lorem.word ()
    });
    console.log("Artist", i);
  }
  
  console.log("Artists Data created");
  
  fs.writeFile('artistsData-'+ w + '.json', JSON.stringify(artistsResults), 'utf8', (err) => {
    if (err) throw err;
    console.log("Artists Data File written!", w);
  });

// }

// for (var w = 1; w < 11; w++) {
  let relatedResults = [];
  for (let i = 0; i < 500000; i++) {
    for (let j = 0; j < 10; j++) {
      let randomId = Math.floor(Math.random () * Math.floor (10000000));
      while (randomId === i*w) {
        randomId = Math.floor(Math.random () * Math.floor (10000000));
      }
      relatedResults.push ({
        related_Artist_ID: randomId + 1,
        main_Artist_ID: i + 1
      });
    }
    console.log("Related Artist", i);
  }

  console.log("Related Artists Data created");

  fs.writeFile('relatedArtistsData-'+ w + '.json', JSON.stringify(relatedResults), 'utf8', (err) => {
    if (err) throw err;
    console.log("Related Artists Data File written!");
  })
    
  

// }
