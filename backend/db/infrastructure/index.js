const MongoClient = require('mongodb').MongoClient;
const urlDb = "mongodb+srv://user:123@cluster0-sddxz.mongodb.net/test?retryWrites=true&w=majority";

async function db (dbName) {
	const db = await MongoClient.connect(urlDb,{ useUnifiedTopology: true } )
	const collection = await db.db("documentOne")
	return collection.collection(dbName)
}

module.exports =  db
