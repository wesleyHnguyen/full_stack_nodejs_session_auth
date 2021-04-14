const mongoose = require('mongoose');

const con = 'mongodb://dbtest:123456Abr@cluster0-shard-00-00.01jj7.mongodb.net:27017,cluster0-shard-00-01.01jj7.mongodb.net:27017,cluster0-shard-00-02.01jj7.mongodb.net:27017/fullAPI?ssl=true&replicaSet=atlas-8ggbfc-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(
    process.env.MONGO_URI || con,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } 
)

module.exports = mongoose