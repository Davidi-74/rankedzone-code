const axios = require('axios')
const qs = require('qs');
const Tokens = require('./tokensSchema')
const userBL = require('./usersBL')
const mongoose = require('mongoose');



const getTokens = async () => {
    await mongoose.connect('mongodb://localhost:27017/wzDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
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

const users = [
    {
        "username": "Mogess#6722805",
        "uno": "16366980"
    },
    {
        "username": "Chadders#6160777",
        "uno": "4206583216900167350"
    },
    {
        "username": "LocoStyle#3453012",
        "uno": "12076727773423294760"
    },
    {
        "username": "Genny_39#4668217",
        "uno": "9916587254103224968"
    },
    {
        "username": "Davidi74#9028931",
        "uno": "15922230560931441593"
    },
    {
        "username": "dark_action67#3964198",
        "uno": "3522689434790465773"
    },
    {
        "username": "POVpro#5660409",
        "uno": "12741702371710687666"
    },
    {
        "username": "JagUR 29#1032157",
        "uno": "16453587889577225930"
    },
    {
        "username": "-1",
        "uno": "13695242479321340880"
    },
    {
        "username": "Ewen_Dagaud#9353974",
        "uno": "14770172068687954886"
    },
    {
        "username": "alex150291#8069681",
        "uno": "797829514674058335"
    },
    {
        "username": "-1",
        "uno": "13952016610020841678"
    },
    {
        "username": "-1",
        "uno": "2250106513132304720"
    },
    {
        "username": "BIZA_TN#7792745",
        "uno": "13085944209685562774"
    },
    {
        "username": "figodubrazil33#8969039",
        "uno": "9625885432540805510"
    },
    {
        "username": "Wonster23#8814136",
        "uno": "8490630833291666574"
    },
    {
        "username": "Bwez#6022124",
        "uno": "7709929334580238862"
    },
    {
        "username": "vasilaras1993#6088466",
        "uno": "14663903353955478336"
    },
    {
        "username": "rhaegal13511#2693378",
        "uno": "7341130876077741579"
    },
    {
        "username": "ttvdimkour#3389973",
        "uno": "17358225292622898564"
    },
    {
        "username": "inspecteur_tiih#7670812",
        "uno": "16381667944424044765"
    },
    {
        "username": "-1",
        "uno": "11283648999323441800"
    },
    {
        "username": "amofi#8439401",
        "uno": "17470318779996400839"
    },
    {
        "username": "alanpipol#7966448",
        "uno": "2354520291117047468"
    },
    {
        "username": "MaffimoXVII#5923351",
        "uno": "12270485137889888810"
    },
    {
        "username": "Jdb85#9291620",
        "uno": "13831509745375728291"
    },
    {
        "username": "skuns#9573787",
        "uno": "2775223921771718837"
    },
    {
        "username": "maguire is goat#4233224",
        "uno": "16337952956698802491"
    },
    {
        "username": "KostasArp2007#6027220",
        "uno": "13832867911026093369"
    },
    {
        "username": "-_-_-_-_-_-#8073328",
        "uno": "6250018768607318708"
    },
    {
        "username": "Jag nulla dig#7347752",
        "uno": "3148641221334566995"
    },
    {
        "username": "-1",
        "uno": "12009040233512532868"
    },
    {
        "username": "Lavonas#5078085",
        "uno": "9746345552722425044"
    },
    {
        "username": "RTXGabry#2089913",
        "uno": "16771740329589052890"
    },
    {
        "username": "Malza89#2993650",
        "uno": "13940543329580232422"
    },
    {
        "username": "Afonzokill#4831629",
        "uno": "18022837504067882950"
    },
    {
        "username": "Hamster_Chinois_#3547419",
        "uno": "6864257044850589422"
    },
    {
        "username": "-1",
        "uno": "11539145119042528114"
    },
    {
        "username": "-1",
        "uno": "10513830154929303177"
    },
    {
        "username": "-1",
        "uno": "12292579105039299649"
    },
    {
        "username": "isg__xy#7548607",
        "uno": "1934992429348064124"
    }
]

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

    let teams = sortByTeam(relevantData)
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