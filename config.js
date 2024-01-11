// config.js stores my senstive info.
// This file contains placeholder values that will be replaced by actual environment variables at runtime.
// Use this file (& import into dal.js) if I can figure out how to hide Connection String in dal.js and the private key in AuthRoutes.json
const config = {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017',
    privateKeyId: process.env.PRIVATE_KEY_ID,
    privateKey: process.env.PRIVATE_KEY,
};

export default config;