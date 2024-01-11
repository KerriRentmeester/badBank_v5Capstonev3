import pkg from 'mongodb';
const { MongoClient } = pkg;
//import config from './config.js';
//import * as config from './config';

// Declare db outside of the startServer function
let db = null;

async function startServer() {
    // connect to local Docker container
    // const url = 'mongodb://localhost:27017';  // point to local machine
    // Connection String format: mongodb+srv://<username>:<password>@<cluster-name>.<jibberish>.mongodb.net/?retryWrites=true&w=majority  // points to the cloud so all data is shared with all users
    // const url = config.MONGODB_URL;  // points to the cloud so all data is shared with all users
    const url = process.env.MONGODB_URL // points to the cloud so all data is shared with all users
    //const url = 'mongodb+srv://krentmeester:mnoo1325@cluster0.jro0rtf.mongodb.net/?retryWrites=true&w=majority';
    console.log("Connecting to MongoDB at: ", url);

    try {
        // Connect to MongoDB using await
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        db = client.db('myproject');  // Assign the reference to the 'myproject' db to the variable 'db'
        console.log("Connected successfully to db server");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

    // create user account using the collection.insertOne function
    function create(name, email, password) {
        return new Promise((resolve, reject) => {
            const collection = db.collection('users');
            const doc = {name, email, password, balance: 0};

            // Log the data being inserted
            console.log('Inserting document:', doc);

            collection.insertOne(doc, {w:1}, function(err, result) {
                if (err) {
                    console.error('Error inserting document:', err);
                    reject('Error creating user account');
                } else {
                    console.log('Document inserted successfully:', result.ops[0]);
                    resolve(doc);
                }
            });
        })
    }

    // find user account 
    function find(email) {
        return new Promise((resolve, reject) => {
            const customers = db
                .collection('users')
                .find({ email: email })
                .toArray(function (err, docs) {
                    err ? reject(err) : resolve(docs);
                });
        })
    }

    //why is this in here twice-2 versions?
    // find user account
    function findOne(email) {
        return new Promise((resolve, reject) => {
            const customers = db
                .collection('users')
                .findOne({ email: email })
                .then((doc) => resolve(doc))
                .catch((err) => reject(err));
        })
    }

    // alternate find user acct code:
    /*function findOne(email) {
        return db.collection('users').findOne({ email });
    }
    */

    // update - deposit/withdraw amount
    function update(email, amount) {
        return new Promise((resolve, reject) => {
            const customers = db
                .collection('users')
                .findOneAndUpdate(
                    { email: email },
                    { $inc: { balance: amount } },
                    { returnOriginal: false },
                    function (err, documents) {
                        err ? reject(err) : resolve(documents);
                    }
                );
        });
    }

    // return all users by using the collection.find method
    function all() {
        return new Promise((resolve, reject) => {
            const customers = db
                .collection('users')
                .find({})
                .toArray(function(err, docs) {
                    err ? reject(err) : resolve(docs);
                });
        })
    }

// Call the asynchronous function to connect to MongoDB
startServer();

export default { create, findOne, find, update, all };