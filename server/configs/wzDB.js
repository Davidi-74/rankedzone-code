const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/wzDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

const uri = "mongodb+srv://davidi74:RJ6xWZhZsiYquUg@cluster0.mx9dx.mongodb.net/wzDB?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})