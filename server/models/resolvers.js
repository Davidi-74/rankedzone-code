const Tokens = require('./tokensSchema')
const tokensBL = require('./tokensBL')
const usersBL = require('./usersBL')
const matchesBL = require('./matchesBL')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.getTime();
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10);
            }
            return null;
        },
    }),
    getTokens: async () => {
        const tokens = await Tokens.find({});
        return tokens[0];
    },
    updateTokens: async () => {
        const tokens = await tokensBL.getTokens();
        let now = new Date();
        let currentTokens = await Tokens.find({});
        let resp = await Tokens.findByIdAndUpdate(currentTokens[0].id, {
            csrf: tokens.csrf,
            sso: tokens.sso,
            atkn: tokens.atkn,
            lastUpdated: now
        }, false)
        return resp;
    },
    getProfile: async ({ username, platform }) => {
        const profile = await usersBL.getProfile(username, platform);
        return profile;
    },
    getMatchesByPlayer: async ({ username, platform }) => {
        const matches = await matchesBL.getMatchesByPlayer(username, platform);
        return matches;
    },
    getMatchByID: async ({ id }) => {
        const match = await matchesBL.getMatchByID(id);
        return match;
    },
    getHashUsernames: async ({ matchID }) => {
        const users = await matchesBL.getHashUsernames(matchID);
        return users;
    }
}

module.exports = resolvers;