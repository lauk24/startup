const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('soundescape');

const userCollection = db.collection('user');
const libraryCollection = db.collection('library');
const globalRatingCollection = db.collection('globalRating');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

function getLibrary(email) {
  return libraryCollection.find({ email: email }).toArray();
}

async function addOrUpdateLibraryEntry(email, entry) {
    await libraryCollection.updateOne({ email: email, mbid: entry.mbid }, { $set: entry }, { upsert: true })
}

function getGlobalRating(mbid) {
    return globalRatingCollection.findOne({ mbid:mbid })
}

async function addOrUpdateGlobalRating(mbid, newRating, oldRating) {
    const globalEntry = await getGlobalRating(mbid)
    if (globalEntry === null){
        await globalRatingCollection.insertOne({
            mbid: mbid,
            averageRating: newRating,
            ratingCount: 1
        })
    } else {
        let newCount;
        let newAverage;
        if (oldRating === null) {
            newCount = globalEntry.ratingCount + 1;
            newAverage = (globalEntry.averageRating * globalEntry.ratingCount + newRating)/ newCount;
        } else {
            newCount = globalEntry.ratingCount;
            newAverage = (globalEntry.averageRating * globalEntry.ratingCount + newRating - oldRating)/ newCount;
        }
        await globalRatingCollection.updateOne(
            { mbid: mbid },
            { $set: { averageRating: newAverage, ratingCount: newCount } }
        )

    }
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  getLibrary,
  addOrUpdateLibraryEntry,
  getGlobalRating,
  addOrUpdateGlobalRating
};