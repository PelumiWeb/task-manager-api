// CRUD create read update delete
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const {MongoClient, ObjectID} = require('mongodb')
 
const connectionURl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURl, {useNewUrlParser: true}, (error, client) => {
if (error) {
    return console.log('unable to connect')
}
    const db = client.db(databaseName)

    db.collection('users').deleteMany({
        name: 'Yemi'
    }).then((user)=> {
    console.log(user) 
    }).catch((error) => {
        console.log(error)
    })

})
    
 