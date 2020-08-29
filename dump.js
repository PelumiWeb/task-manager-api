    // db.collection('users').findOne({_id: new ObjectID("5f2ba69d916dea06388e6964")}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)

    // })
    // db.collection('users').insertOne({
    //     id: id,
    //     name: 'Vikram',
    //     age: 26
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('unable to insert user')
    //     }
        
    //     console.log(result.ops)
    // })
    // db.collection('users').insertMany([
    //     {
    //         name: 'jen',
    //         age: 28
    //     },
    //     {
    //         name: 'Gunter',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //       return console.log('Unable to connect')  
    //     }

    //     console.log(result.ops) 

    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Pelumi',
    //         paySchoolFee: true
    //     },
    //     {
    //         name: 'Hassan',
    //         paySchoolFee: false
    //     }, {
    //         name: 'Yemi',
    //         paySchoolFee: true
    //     }

        
    // ], (error, result) => {
    //     if (error) {
    //         console.log('Unable to connect')
    //     }
    //     console.log(result.ops)
        
    // })

    // db.collection('users').find({age: 27}).toArray((error, users) => {
    //  console.log(users)
    // }) 
    // db.collection('users').find({age: 27}).count((error, count) => {
    //     console.log(count)
    //    })

    // db.collection('user').findOne({_id: new ObjectID("5f2ba5c2cec3b21e84c34c7c")}, (error, user) => {
    //     if (error) {
    //         console.log('Unable to connect')
    //     }
    //     console.log(user)
    // })

    // db.collection('user').find({ paySchoolFee: true}).toArray((error, users) =>{
    //     console.log(users)
    // })

    //     db.collection('task').insertMany([{
//         name: 'oluwaPelumi',
//         age: 22
//     }, {
//         name: 'Boluwatife',
//         age: 20
//     }, {
//         name:'Toluwanimi',
//         age: 15
//     }

// ], (error, result) => {
//  if (error) {
//      console.log(error, 'Unale to connect')
//  }
//  console.log(result.ops)
// })
  // db.collection('task').updateOne({_id: new ObjectID("5f2c6267fcab762b6cb6f4ca")}, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    // console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    
    // db.collection('users').updateMany({ paySchoolFee: true},
    //     {
    //         $set: {
    //             paySchoolFee: false
    //         }
    //     }).then((update) => {
    //     console.log(update)
    //     }).catch((error) => {
    //     console.log(error)
    //     })