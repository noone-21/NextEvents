import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
    return await MongoClient.connect('mongodb+srv://datechscale:hesoyam.14@cluster0.cmeuax1.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0')
  }

  export const insertToDatabase = async (client, document,database) => {

    const db = client.db()
    return await db.collection(database).insertOne(document)
  }


  export const findFromDatabase = async (client, collection) => {

    const db = client.db()
    return await db.collection(collection).find().sort({_id: -1}).toArray()

  }