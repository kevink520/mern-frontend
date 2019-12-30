/*const functions = require('firebase-functions');
const fs = require('fs');
const request = require('request');
const axios = require('axios');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const login = {
  email: 'johndoe@test.test',
  password: '052075',
};

const places = [{
  title: 'London Bridge',
  image: 'https://vitamindigitalmediaassets.s3.us-east-2.amazonaws.com/marek-rucinski-YGsxZMhNPXg-unsplash.jpg',
  description: 'Several bridges named London Bridge have spanned the River Thames between the City of London and Southwark, in central London. The current crossing, which opened to traffic in 1973, is a box girder bridge built from concrete and steel.',
  address: 'London SE1 9RA, United Kingdom'
}, {
  title: 'Louvre Pyramid',
  image: 'https://vitamindigitalmediaassets.s3.us-east-2.amazonaws.com/j-venerosy-EitiaUwmD-8-unsplash.jpg',
  description: 'The Louvre Pyramid is a large glass and metal pyramid designed by Chinese-American architect I. M. Pei, surrounded by three smaller pyramids, in the main courtyard of the Louvre Palace in Paris. The large pyramid serves as the main entrance to the Louvre Museum.',
  address: '75001 Paris, France'
}, {
  title: 'The Great Pyramid of Giza',
  image: 'https://vitamindigitalmediaassets.s3.us-east-2.amazonaws.com/shotaro-hamasaki-mzghvPhdEFY-unsplash.jpg',
  description: 'The Great Pyramid of Giza is the oldest and largest of the three pyramids in the Giza pyramid complex bordering present-day Giza in Greater Cairo, Egypt. It is the oldest of the Seven Wonders of the Ancient World, and the only one to remain largely intact.',
  address: 'Al Haram, Nazlet El-Semman, Al Giza Desert, Giza Governorate, Egypt'
}];

const download = (uri, filepath) => (
  new Promise((resolve, reject) => {
    request.head(uri, (err, res, body) => {
      request(uri).pipe(fs.createWriteStream(filepath)).on('close', resolve).on('error', reject);
    });
  })
);

const downloadImage = async (uri, filepath) => {  
  const writer = Fs.createWriteStream(filepath)
  const response = await axios({
    uri,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
};

exports.yourPlaces = functions.https.onRequest(async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });

    const page = await browser.newPage()
    await page.goto('https://your-places-a9e81.firebaseapp.com/auth', {
      waitUntil: `networkidle0`,
    });
    
    await page.type('#email', login.email);
    await page.type('#password', login.password);
    const navigationPromise = page.waitForNavigation();
    await page.click('.button[type="submit"]');
    await navigationPromise;
    //const screenShotBuffer = await page.screenshot({ path: '/tmp/github.png' });
    for (place of places) {
      const filename = place.image.split('/').pop();
      const filepath = `../tmp/${filename}`;
      const navigationPromise2 = page.waitForNavigation()
      await page.click('a[href="/places/new"]');
      await navigationPromise2;
      await page.type('#title', place.title);
      await page.type('#description', place.description);
      await page.type('#address', place.address);
      await download(place.image, filepath);
      const input = await page.$('#image');
      await input.uploadFile(filepath);
      const navigationPromise3 = page.waitForNavigation();
      await page.click('.button[type="submit"]');
      await navigationPromise3;
    }
    /*res.writeHead(200,  {
      'Content-Type': 'image/png',
      'Content-length': screenShotBuffer.length,
    });

    res.end(screenShotBuffer)*/
    /*browser.close();

    res.send('success');
  } catch (error) {
    res.send(JSON.stringify({error}));
  }
});*/
