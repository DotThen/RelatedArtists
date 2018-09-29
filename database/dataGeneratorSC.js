const fs = require('fs');
const faker = require('faker');

(function genArtist() {
    for (var i = 0; i < 10; i ++) {
      generateArtist();
    }
}());

const generateArtist = () => new Promise ((resolve, reject) => {
  let artists ='';
  for (var i = 0; i < 1000000; i ++) {
    artists += `${faker.name.findName()}, ${faker.random.number(10000)}, https://s3.amazonaws.com/spotifyphotos/${i%39+1}.jpg, ${faker.company.bs()}\n`
  }
  resolve(fs.appendFileSync('./database/artistsAll2.csv', artists));
}); 

// ---------------------------
// experiment... 

const genArtistRelationships = (stream, start, end) => new Promise ((res, rej) => {
  for (var i = start; i <= end; i ++) {
    stream.write(`${i}, ${Math.floor(Math.random()*10000000)}\n`);
  }
  stream.on('error', err => rej(err));
  stream.end(res)
});

const genRelations = async () => {
  k = 1000000;
  start = 1;
  end = start + k;
  let artistRelFile = fs.createWriteStream('./database/relationsAll.csv');
  for (var i = 0; i < 10; i ++) {
    await genArtistRelationships(artistRelFile, start, end);
    artistRelFile = fs.createWriteStream(`./database/relations${i}.csv`);
    start += k; 
    console.log('yoohoo')
  }
}

genRelations();