// app.js
const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection string
const connectionurl = 'mongodb://localhost:27017/task-manager'; 


// Create a new MongoClient
const client = new MongoClient(connectionurl, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
async function connectToDB() {
  try {
    client = await client.connect();
    console.log('Connected to MongoDB!');
    
    const db = client.db('task-manager');

    // FIND ONE:
    // const data = await db.collection('users').findOne( { name: 'Nidhi'})
    // console.log(data)

    // FIND ALL
    // const data = await db.collection('users').find( { age: 23}).toArray()
    // console.log(data)
    
    // const data = db.collection('users').updateOne(
    //    { _id: new ObjectId('64bfbd7c6300bd8fcae75e55')},
    //    {
    //     $set: {
    //       name: "Urvi"
    //     }
    //    }
    //    )
    
    //   data.then((result) => {
    //     console.log(result)
    //   }).catch((error) => {
    //     console.log(error)
    //   })

  // INSERT DATA:
  //   const result = await db.collection('tasks').insertMany([ 
  //     {
  //       description:'Node learning practical',
  //       status : false
  //     },
  //     {
  //       description:'Node learning',
  //       status : true
  //     }
  // ])

  //   console.log("data inserted", result)

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectToDB();

