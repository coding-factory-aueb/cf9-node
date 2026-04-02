
// Select the database to use.
use('codingfactory');

db.getCollection('users').find()


db.getCollection('users').findOne({'username':'admin'},{'roles':0})


db.getCollection('users').find({},{'username':1, 'lastname':1, 'firstname':1}).sort({'firstname':1})

db.getCollection('users').find({'address.area':'area1'},{username:1, 'firstname':1, lastname:1, 'address.area':1})


db.getCollection('users').find({
  'phone.type':'work'
})

db.getCollection('users').find({
    $or: [
      {'phone.number':'2101111111'},
      {'phone.number':'2103334444'}
    ]
  }
)

use('codingfactory');
db.getCollection('users').updateMany(
  {'phone.type':'work'},
  {
    $set:{'phone.$.number':'-'}
  }
)

use('codingfactory')
db.getCollection('users').updateOne(
  {username:'giorgos'},
  {
    $pull: {
      phone: {type: 'work'}
    }
  }
)

use('codingfactory')
db.getCollection('users').updateMany(
  {},
  {
    $unset: {
      newfield1:''
    }
  }
)

use('codingfactory')
db.getCollection('users').aggregate([
  {
    $match: {
      'address.area':'area3'
    }
  },
  {
    $project:{
      count: {$size:"$phone"}
    }
  }
])

use('codingfactory')
db.getCollection('users').aggregate([
  {
    $project: {
      '_id':0,
      'phone':1
    }
  },
  {
    $unwind: "$phone"
  },
  {
    $project: {
      "phone":"$phone.type"
    }
  }
])

use('codingfactory')
db.getCollection('users').aggregate([
  {
    $project:{
      '_id':0,
      'roles':1
    }
  },
  {
    $unwind:"$roles"
  },
  {
    $match: {
      'roles.role':'ADMIN',
      'roles.active':true
    }
  },
  {
    $group: {
      _id: {role:"$roles.role"},
      activeAdmins: {
        $sum: 1
      }
    }
  }
])

use('codingfactory')
db.getCollection('users').aggregate([
  {
    $unwind:"$phone"
  },
  {
    $group:{
      _id: {municipality:"$address.municipality", phoneType:"$phone.type"},
      count: { $sum:1 }
    }    
  },
  {
    $sort: {'_id.municipality':1}
  }
])

use('codingfactory')
db.getCollection('users').aggregate([
  {
    $unwind:"$roles"
  },
  {
    $group: {
      _id: '$roles.role',
      total: {$sum:1},
      active: {$sum: {$cond:["$roles.active", 1, 0]}}
    }
  },
  {$sort: {total:-1}}
])

use('codingfactory')
db.getCollection('users').aggregate([
  {
    $project:{
      _id:0,
      username:1,
      products:1
    }
  },
  {
    $unwind: "$products"
  },
  {
    $lookup: {
      from: 'products',
      localField: 'products.product',
      foreignField: 'product',
      as: "results"
    }
  }
])

s