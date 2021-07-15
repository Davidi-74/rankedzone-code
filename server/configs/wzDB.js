const mongoose = require('mongoose');
require('dotenv').config();

// mongoose.connect('mongodb://localhost:27017/wzDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

const uri = process.env.URI

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})