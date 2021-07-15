const axios = require('axios')
const Tokens = require('./tokensSchema')
const userBL = require('./usersBL')

const getTokens = async () => {
    const tokens = await Tokens.find({});
    return tokens[0];
}

const formatMatchesData = (data) => {
    let matches = data.map((match) => {
        return ({
            matchID: match.matchID,
            mode: match.mode,
            utcStartSeconds: match.utcStartSeconds,
            utcEndSeconds: match.utcEndSeconds,
            duration: match.duration,
            playerStats: {
                kills: match.playerStats.kills,
                deaths: match.playerStats.deaths,
                kdRatio: match.playerStats.kdRatio,
                score: match.playerStats.score,
                totalXp: match.playerStats.totalXp,
                headshots: match.playerStats.headshots,
                damageDone: match.playerStats.damageDone,
                damageTaken: match.playerStats.damageTaken
            },
            teamStats: {
                placement: match.playerStats.teamPlacement,
                team: match.player.team,
            }
        })
    })
    let obj = {
        uno: data[0].player.uno,
        username: data[0].player.username,
        clantag: data[0].player.clantag,
        matches: matches
    }
    return obj;
}

const matchesRelevantData = (data) => {
    let relevantData = formatMatchesData(data.matches);

    let obj = {
        uno: relevantData.uno,
        username: relevantData.username,
        clantag: relevantData.clantag,
        matches: relevantData.matches,
        summary: data.summary
    }

    return obj;
}

const getMatchesByPlayer = async (username, platform) => {
    let tokens = await getTokens();
    let encodedUsername = encodeURIComponent(username);
    let tokensString = 'ACT_SSO_COOKIE=' + tokens.sso + '; ACT_SSO_COOKIE_EXPIRY=1591153892430; atkn=' + tokens.atkn;
    const matchesConfig = {
        method: 'get',
        url: `https://my.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/${platform}/gamer/${encodedUsername}/matches/wz/start/0/end/0/details`,
        headers: {
            'Cookie': tokensString
        }
    };

    return new Promise((res, rej) => {
        axios(matchesConfig)
            .then(function (response) {
                if (response.data.status === "success") {
                    // res(response.data.data)
                    res(matchesRelevantData(response.data.data))
                }
                else {
                    res(response.data.data.message)
                }
            })
            .catch(function (error) {
                rej(error)
            });
    })
}

const sortByTeam = (players) => {
    let lastTeam = Math.max(...players.map(player => player.teamPlacement))
    let teams = [];
    for (let i = 0; i < lastTeam; i++) {
        let next = players.filter(player => player.teamPlacement === (i + 1));
        teams.push(next);
    }
    return teams;
}

const plunderSortByTeam = (players) => {
    let teams = [];
    let passed = [];
    players.forEach((player) => {
        let currentTeam = player.team;
        if (!passed.includes(currentTeam)) {
            passed.push(currentTeam)
            let team = players.filter(player => player.team === currentTeam);
            teams.push(team);
        }
    })
    return teams;
}



const searchUser = async (username, uno) => {
    let tokens = await getTokens();
    let tokensString = 'ACT_SSO_COOKIE=' + tokens.sso + '; ACT_SSO_COOKIE_EXPIRY=1591153892430; atkn=' + tokens.atkn;
    const encodedUsername = encodeURIComponent(username);
    const getUserKdConfig = {
        method: 'get',
        url: `https://my.callofduty.com/api/papi-client/crm/cod/v2/platform/uno/username/${encodedUsername}/search`,
        headers: {
            'Cookie': tokensString
        }
    }

    return new Promise((res, rej) => {
        axios(getUserKdConfig)
            .then(function (response) {
                if (response.data.data.length === 0) {
                    res(-1)
                }
                let userFound = response.data.data.filter(player => uno === player.accountId);
                if (userFound.length === 0) {
                    res(-1)
                }
                res(userFound[0].username)
            })
            .catch(function (error) {
                rej(error)
            });
    })
}

const searchMultipleUsers = async (players) => {
    let playersWithActiID = [];
    for (const player of players) {
        let playerWithActiId = await searchUser(player.username, player.uno);
        playersWithActiID.push({ uno: player.uno, username: playerWithActiId });
    }
    return playersWithActiID;
}

const getMultipleKDs123 = async (players) => {
    let playersWithKDs = [];
    for (const player of players) {
        if (player.username === "-1") {
            playersWithKDs.push({ uno: player.uno, username: player.username, lifetimeKDRatio: -1 });
        }
        else {
            let kd = await userBL.getUserKD(encodeURIComponent(player.username));
            playersWithKDs.push({ uno: player.uno, username: player.username, lifetimeKDRatio: kd });
        }
    }
    console.log(playersWithKDs);
    return playersWithKDs;
}

const getLifetimeKD123 = (players, uno) => {
    let relevantPlayer = players.filter(player => player.uno === uno);
    console.log(relevantPlayer.lifetimeKDRatio);
    return relevantPlayer.lifetimeKDRatio;
}

const getLifetimeDataByUNO = async (platform, username, uno) => {
    let tokens = await getTokens();
    let tokensString = 'ACT_SSO_COOKIE=' + tokens.sso + '; ACT_SSO_COOKIE_EXPIRY=1591153892430; atkn=' + tokens.atkn;

    const lifetimeDataConfig = {
        method: 'get',
        url: `https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/${platform}/uno/${uno}/profile/type/wz`,
        headers: {
            'Cookie': tokensString
        }
    }

    return new Promise((res, rej) => {
        axios(lifetimeDataConfig)
            .then(function (response) {
                if (response.data.status === "error") {
                    res(response.data)
                }
                else {
                    response.data.data.username = username;
                    res(response.data)
                }
            })
    })
}

const getLifetimeKD = async (username, uno) => {
    let platform = "battle";
    let resp = await getLifetimeDataByUNO(platform, username, uno);
    if (resp.status === "success") {
        let kdRatio = resp.data.lifetime.mode.br_all.properties.kdRatio;
        return { username, kdRatio }
    }
    else if (resp.data.message === "Not permitted: not allowed") {
        return { username, kdRatio: -1 };
    }

    platform = "psn";
    resp = await getLifetimeDataByUNO(platform, username, uno);
    if (resp.status === "success") {
        let kdRatio = resp.data.lifetime.mode.br_all.properties.kdRatio;
        return { username, kdRatio }
    }
    else if (resp.data.message === "Not permitted: not allowed") {
        return { username, kdRatio: -1 };
    }

    platform = "xbl";
    resp = await getLifetimeDataByUNO(platform, username, uno);
    if (resp.status === "success") {
        let kdRatio = resp.data.lifetime.mode.br_all.properties.kdRatio;
        return { username, kdRatio }
    }
    else if (resp.data.message === "Not permitted: not allowed") {
        return { username, kdRatio: -1 };
    }
}

const getMultipleKDs = async (playersList) => {
    let players = {};
    for (const player of playersList) {
        let playerWithKD = await getLifetimeKD(player.username, player.uno);
        players[player.uno] = playerWithKD;
    }
    return players;
}

const sumTeamStats = (team) => {
    let teamStats = { kills: 0, deaths: 0, damageDone: 0, damageTaken: 0, headshots: 0 };
    team.forEach(player => {
        teamStats.kills += player.kills;
        teamStats.deaths += player.deaths;
        teamStats.damageDone += player.damageDone;
        teamStats.damageTaken += player.damageTaken;
        teamStats.headshots += player.headshots;
    });
    return teamStats;
}

const formatMatchByID = async (data) => {
    let obj = {
        utcStartSeconds: data[0].utcStartSeconds,
        utcEndSeconds: data[0].utcEndSeconds,
        mode: data[0].mode,
        matchID: data[0].matchID,
        playerCount: data[0].playerCount
    }

    // let usernamesAndUnos = data.map(player => {
    //     let specificPlayer = player.player;
    //     let obj = {
    //         uno: specificPlayer.uno,
    //         username: specificPlayer.username
    //     }
    //     return obj;
    // })
    // let playersWithKDs = await getMultipleKDs(usernamesAndUnos);
    // console.log(playersWithKDs);

    let relevantData = data.map(player => {
        let playerStats = player.playerStats;
        let specificPlayer = player.player;
        let relevantStats = {
            uno: specificPlayer.uno,
            username: specificPlayer.username,
            clantag: specificPlayer.clantag,
            team: specificPlayer.team,
            kills: playerStats.kills,
            deaths: playerStats.deaths,
            kdRatio: playerStats.kdRatio,
            totalXp: playerStats.totalXp,
            headshots: playerStats.headshots,
            teamPlacement: playerStats.teamPlacement,
            damageDone: playerStats.damageDone,
            damageTaken: playerStats.damageTaken,
            // lifetimeKDRatio: playersWithKDs[specificPlayer.uno].kdRatio
        };
        return relevantStats;
    })
    let teams = [];
    if (obj.mode === "br_dmz_plnbld") {
        teams = plunderSortByTeam(relevantData)
    }
    else {
        teams = sortByTeam(relevantData)
    }
    let teamsCopy = [];
    teams.forEach((team) => {
        let teamStats = sumTeamStats(team);
        let obj = {
            players: team,
            teamStats: teamStats
        }
        teamsCopy.push(obj);
    })

    obj.teams = teamsCopy;
    return obj;
}

const getMatchByID = async (id) => {
    let tokens = await getTokens();
    let tokensString = 'API_CSRF_TOKEN=' + tokens.csrf;
    const matchIDConfig = {
        method: 'get',
        url: `https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/${id}/it`,
        headers: {
            'Cookie': tokensString
        }
    };

    return new Promise((res, rej) => {
        axios(matchIDConfig)
            .then(function (response) {
                if (response.data.status === "success") {
                    res(formatMatchByID(response.data.data.allPlayers))
                }
                else {
                    res(response.data.data.message)
                }
            })
            .catch(function (error) {
                rej(error)
            });
    })
}
// getMatchByID("8853234029368613444");

const getMatchByIDRAW = async (id) => {
    let tokens = await getTokens();
    let tokensString = 'API_CSRF_TOKEN=' + tokens.csrf;
    const matchIDConfig = {
        method: 'get',
        url: `https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/${id}/it`,
        headers: {
            'Cookie': tokensString
        }
    };

    return new Promise((res, rej) => {
        axios(matchIDConfig)
            .then(function (response) {
                if (response.data.status === "success") {
                    res(response.data.data.allPlayers)
                }
                else {
                    res(response.data.data.message)
                }
            })
            .catch(function (error) {
                rej(error)
            });
    })
}

const getHashUsernames = async (matchID) => {
    let data = await getMatchByIDRAW(matchID);

    let usernamesAndUnos = data.map(player => {
        let specificPlayer = player.player;
        let obj = {
            uno: specificPlayer.uno,
            username: specificPlayer.username
        }
        return obj;
    })
    console.log(usernamesAndUnos);

    let playersWithActiIDs = await searchMultipleUsers(usernamesAndUnos);
    return { users: playersWithActiIDs };
}



module.exports = { getMatchesByPlayer, getMatchByID, getHashUsernames }