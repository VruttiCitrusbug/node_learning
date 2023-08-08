const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

const id = new ObjectId()
console.log(id)
//new ObjectId("64d1cd9df42ada499c248d46") hexadecimal 4 byte seconds unix approch 5 byte random val 3 byte counter--random

console.log(id.getTimestamp())//2023-08-08T05:09:42.000Z

console.log(id.id)//len 12 <Buffer 64 d1 ce ab 53 a9 12 40 25 58 fe 3d>

console.log(id.toString().length)//same op as hexstr len 24

console.log(id.toHexString())//len 12 <Buffer 64 d1 ce ab 53 a9 12 40 25 58 fe 3d>

async function main() {
    
    const client = await MongoClient.connect(connectionURL);
 
    const db = client.db(dbName)

    db.collection('users').insertOne({
        _id:id,
        name: 'Vrutti',
        age: 23
    }).then((response)=>{
        console.log(response)
        //return {
        //   acknowledged: true,
        //   insertedId: new ObjectId("64d1c97f00543c96e6150118")
        // }
    })
    db.collection('users').insertMany(
    [
        {
        name: 'PQR',
        age: 32
        },
        {
            name: 'RST',
            age: 33
        }
    ]
    ).then((response)=>{
        console.log(response)
        // return {
        //     acknowledged: true,
        //     insertedCount: 2,
        //     insertedIds: {
        //       '0': new ObjectId("64d1cba41de4b23ce0dee4c9"),
        //       '1': new ObjectId("64d1cba41de4b23ce0dee4ca")
        //     }
        //   }
    })
}
 
// main().catch(console.log("NONO"));
// The issue in your code lies in the catch statement where you're handling errors. The catch block should be passed a reference to a function, but you are currently executing console.log("NONO") immediately and passing its result (which is undefined) to the catch block.   timestamp, machine identifier, process identifier, and a random value
main().catch((error)=>{console.log(error)});

//id sequence
// {
//     acknowledged: true,
//     insertedId: new ObjectId("64d1ce403ba8252ff28c0158")
//   }
// {
//     acknowledged: true,
//     insertedId: new ObjectId("64d1ce44c0dbeaeaa1c7695b")
//   }