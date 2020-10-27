const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pastrySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
});


module.exports = mongoose.model('Pastry', pastrySchema);




// const mongodb = require('mongodb');

// const getDb = require('../util/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class Cake {
//     constructor(name, price, image, description, id) {
//         this.name = name;
//         this.price = price;
//         this.description = description;
//         this.image = image;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//     }

//     save() {
//         const db = getDb();
//         let dbOp;

//         if (this._id) {
//             //Update
//             dbOp = db.collection('cakes').updateOne({
//                 _id: this._id
//             }, {
//                 $set: this
//             })
//         } else {
//             dbOp = db.collection('cakes').insertOne(this)
//         }

//         return dbOp
//             .then(result => {
//                 console.log(result);

//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }

//     static fetchAll() {
//         const db = getDb();
//         return db
//             .collection('cakes')
//             .find()
//             .toArray()
//             .then(cakes => {
//                 return cakes
//             })
//             .catch(err => {
//                 console.log(err)
//             });
//     }

//     static findById(cakeId) {
//         const db = getDb();
//         return db.collection('cakes').find({
//                 _id: new mongodb.ObjectId(cakeId)
//             })
//             .next()
//             .then(cake => {
//                 console.log(cake);
//                 return cake;
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }

//     static deleteById(pastryId) {
//         const db = getDb();

//         return db.collection('cakes').deleteOne({
//             _id: new mongodb.ObjectId(pastryId)
//         })
//         .then(result => {
//             console.log('deleted');
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }
// }

// module.exports = Cake;