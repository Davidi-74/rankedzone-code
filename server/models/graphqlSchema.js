const { buildSchema } = require('graphql')

const schema = buildSchema(`
    scalar Date

    type tokenType {
        csrf: String!
        sso: String!
        atkn: String!
        lastUpdated: Date!
    }

    type lifetimeDataType {
        kdRatio: Float!
        wins: Float!
        kills: Float!
        deaths: Float!
        downs: Float!
        topTen: Float!
        topFive: Float!
        contracts: Float!
        revives: Float!
        score: Float!
        timePlayed: Float!
        gamesPlayed: Float!
        scorePerMinute: Float!
    }

    type weeklyModeType {
        all: weeklyDataType
        brSolo: weeklyDataType
        brDous: weeklyDataType
        brTrios: weeklyDataType
        brQuads: weeklyDataType
        rebirthDous: weeklyDataType
        rebirthTrios: weeklyDataType
        rebirthQuads: weeklyDataType
        resurgenceDous: weeklyDataType
        resurgenceTrios: weeklyDataType
        resurgenceQuads: weeklyDataType
    }

    type weeklyDataType {
        kdRatio: Float!
        kills: Float!
        deaths: Float!
        avgLifetime: Float!
        score: Float!
        headshots: Float!
        killsPerGame: Float!
        scorePerMinute: Float!
        scorePerGame: Float
        timePlayed: Float!
        headshotPercentage: Float
        matchesPlayed: Float!
        damageDone: Float!
        damageTaken: Float!
    }

    type profileType {
        username: String!
        platform: String!
        level: Float!
        prestige: Float!
        lifetime: lifetimeDataType
        weekly: weeklyModeType
    }

    type playerStatsType {
        kills: Float!
        deaths: Float!
        kdRatio: Float!
        score: Float!
        totalXp: Float!
        headshots: Float!
        damageDone: Float!
        damageTaken: Float!
        lifetimeKDRatio: Float!
    }

    type teamStatsType {
        placement: Float!
        team: String!
    }

    type matchesType {
        matchID: String!
        mode: String!
        utcStartSeconds: Int!
        utcEndSeconds: Int!
        duration: Int!
        playerStats: playerStatsType
        teamStats: teamStatsType
    }

    type extendedMatchesType {
        uno: String!
        username: String!
        clantag: String
        matches: [matchesType]
    }

    type playerStats {
        uno: String!
        username: String!
        clantag: String
        team: String!
        kills: Float!
        deaths: Float!
        kdRatio: Float!
        totalXp: Float!
        headshots: Float!
        teamPlacement: Float!
        damageDone: Float!
        damageTaken: Float!
        lifetimeKDRatio: Float
    }

    type matchByIDType {
        utcStartSeconds: Int!
        utcEndSeconds: Int!
        mode: String!
        matchID: String!
        playerCount: Int!
        teams: [[playerStats]]
    }

    type hashUsername {
        username: String!
        uno: String!
    }

    type hashUsernames {
        users: [hashUsername]
    }

    type Query {
        getTokens: tokenType
        getProfile(username: String, platform: String): profileType
        getMatchesByPlayer(username: String, platform: String): extendedMatchesType
        getMatchByID(id: String): matchByIDType
        getHashUsernames(matchID: String): hashUsernames
    }

    type Mutation {
        updateTokens: tokenType
    }
`)

module.exports = schema;