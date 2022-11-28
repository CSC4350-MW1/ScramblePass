const admin = require("firebase-admin");
const { getStorage } = require('firebase-admin/storage');
const serviceAccount = require("./secrets.json");

export const verifyIdToken = (token) => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: 'scrambler-pass.appspot.com'
        });

    }

    return admin.auth().verifyIdToken(token).catch((error) => {
        throw error;
    })
};
// 
export const bucket = getStorage().bucket();