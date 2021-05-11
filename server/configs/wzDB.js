const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wzDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})