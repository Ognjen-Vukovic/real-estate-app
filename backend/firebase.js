const admin = require('firebase-admin');
const { config } = require('dotenv');

config(); 

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_SERVICE_ACCOUNT_TYPE,
    project_id: process.env.FIREBASE_SERVICE_ACCOUNT_TYPE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
    auth_uri: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
    token_uri: process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_SERVICE_ACCOUNT_TYPE_AUTH_PROVIDER,
    client_x509_cert_url: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_CERT_URI,
    universe_domain: process.env.FIREBASE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
  }),
});

const db = admin.firestore();

module.exports = { db };
