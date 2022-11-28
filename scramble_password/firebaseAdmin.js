const admin = require("firebase-admin");
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