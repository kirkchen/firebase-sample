const functions = require('firebase-functions');
const main = require('./main');
const thumbnail = require('./thumbnail');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.main = functions.https.onRequest(main);

// exports.generateThumbnail = functions.storage.object().onFinalize(thumbnail);