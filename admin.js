// admin configuration
import admin from 'firebase-admin';

// load the service acct key from JSON
import serviceAccount from './AuthRoutes.json' assert { type: "json" };

// initialize FB Admin SDK w/ provided service acct credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// export configured admin object
export default admin;