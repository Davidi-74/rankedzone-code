const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./models/graphqlSchema')
const resolvers = require('./models/resolvers')
const cors = require('cors')
require('./configs/wzDB');
const app = express();
app.use(cors());
const root = resolvers;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: root
}))
app.listen(process.env.PORT || 8000, () => console.log("Server is up!"))