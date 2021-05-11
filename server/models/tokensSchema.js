const mongoose = require('mongoose');

let tokensSchema = mongoose.Schema;

let Tokens = new tokensSchema({
    csrf: String,
    sso: String,
    atkn: String,
    lastUpdated: Date
})

module.exports = mongoose.model('tokens', Tokens)