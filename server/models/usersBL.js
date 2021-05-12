const axios = require('axios')
const qs = require('qs');
const Tokens = require('./tokensSchema')
const { parse } = require('node-html-parser')

const getTokens = async () => {
    const tokens = await Tokens.find({});
    return tokens[0];
}

const getProfile = async (username, platform) => {
    let tokens = await getTokens();
    let data = qs.stringify({

    });
    let encodedUsername = encodeURIComponent(username);
    let tokensString = 'ACT_SSO_COOKIE=' + tokens.sso + '; ACT_SSO_COOKIE_EXPIRY=1591153892430; atkn=' + tokens.atkn;
    const wzProfileConfig = {
        method: 'get',
        url: `https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/${platform}/gamer/${encodedUsername}/profile/type/wz`,
        headers: {
            'Cookie': tokensString
        },
        data: data
    }

    return new Promise((res, rej) => {
        axios(wzProfileConfig)
            .then(function (response) {
                // res(response.data)
                if (response.data.status === "success") {
                    res(relevantProfileData(response.data.data))
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

const weeklyModeRelevantData = (data) => {
    if (data === null) {
        return null;
    }
    else {
        let obj = {
            kdRatio: data.kdRatio,
            kills: data.kills,
            deaths: data.deaths,
            avgLifetime: data.avgLifeTime,
            score: data.score,
            headshots: data.headshots,
            killsPerGame: data.killsPerGame,
            scorePerMinute: data.scorePerMinute,
            scorePerGame: data.scorePerGame,
            timePlayed: data.timePlayed,
            headshotPercentage: data.headshotPercentage,
            matchesPlayed: data.matchesPlayed,
            damageDone: data.damageDone,
            damageTaken: data.damageTaken
        }
        return obj;
    }
}

const relevantProfileData = (data) => {
    let lifetimeBrData = data.lifetime.mode.br.properties;
    let modesData = data.weekly.mode;
    let currentWeeklyModes = {
        all: modesData.br_all.properties,
        brSolo: modesData.br_brsolo ? modesData.br_brsolo.properties : null,
        brDous: modesData.br_brduos ? modesData.br_brduos.properties : null,
        brTrios: modesData.br_brtrios ? modesData.br_brtrios.properties : null,
        brQuads: modesData.br_brquads ? modesData.br_brquads.properties : null,
        rebirthDous: modesData.br_rebirth_rbrthduos ? modesData.br_rebirth_rbrthduos.properties : null,
        rebirthTrios: modesData.br_rebirth_rbrthtrios ? modesData.br_rebirth_rbrthtrios.properties : null,
        rebirthQuads: modesData.br_rebirth_rbrthquad ? modesData.br_rebirth_rbrthquad.properties : null,
        resurgenceDous: modesData.br_rebirth_resurgence_dous ? modesData.br_rebirth_resurgence_dous.properties : null,
        resurgenceTrios: modesData.br_rebirth_resurgence_trios ? modesData.br_rebirth_resurgence_trios.properties : null,
        resurgenceQuads: modesData.br_rebirth_resurgence_quads ? modesData.br_rebirth_resurgence_quads.properties : null
    }

    let userData = {
        username: data.username,
        platform: data.platform,
        level: data.level,
        prestige: data.prestige,
        lifetime: {
            kdRatio: lifetimeBrData.kdRatio,
            wins: lifetimeBrData.wins,
            kills: lifetimeBrData.kills,
            deaths: lifetimeBrData.deaths,
            downs: lifetimeBrData.downs,
            topTen: lifetimeBrData.topTen,
            topFive: lifetimeBrData.topFive,
            contracts: lifetimeBrData.contracts,
            revives: lifetimeBrData.revives,
            score: lifetimeBrData.score,
            timePlayed: lifetimeBrData.timePlayed,
            gamesPlayed: lifetimeBrData.gamesPlayed,
            scorePerMinute: lifetimeBrData.scorePerMinute
        },
        weekly: {
            all: weeklyModeRelevantData(currentWeeklyModes.all),
            brSolo: weeklyModeRelevantData(currentWeeklyModes.brSolo),
            brDous: weeklyModeRelevantData(currentWeeklyModes.brDous),
            brTrios: weeklyModeRelevantData(currentWeeklyModes.brTrios),
            brQuads: weeklyModeRelevantData(currentWeeklyModes.brQuads),
            rebirthDous: weeklyModeRelevantData(currentWeeklyModes.rebirthDous),
            rebirthTrios: weeklyModeRelevantData(currentWeeklyModes.rebirthTrios),
            rebirthQuads: weeklyModeRelevantData(currentWeeklyModes.rebirthQuads),
            resurgenceDous: weeklyModeRelevantData(currentWeeklyModes.resurgenceDous),
            resurgenceTrios: weeklyModeRelevantData(currentWeeklyModes.resurgenceTrios),
            resurgenceQuads: weeklyModeRelevantData(currentWeeklyModes.resurgenceQuads)
        }
    }
    return userData;
}

const getUserKD = async (username) => {
    const url = `https://cod.tracker.gg/warzone/profile/atvi/${username}/overview`
    let resp = await axios.get(url);
    let dataString = new String(resp.data);
    let temp = dataString.replace("<!DOCTYPE html>", "");
    let finalString = temp.substring(1);
    const root = parse(finalString);
    let preTrimmedData = root.querySelectorAll('script')[1].rawText;
    let firstTrimmedData = preTrimmedData.replace("window.__INITIAL_STATE__=", "");
    let secondTrimmedData = firstTrimmedData.replace(";(function(){var s;(s=document.currentScript||document.scripts[document.scripts.length-1]).parentNode.removeChild(s);}());", "");
    let userData = JSON.parse(secondTrimmedData);
    let kd = userData["stats-v2"].standardProfiles[`warzone|atvi|${decodeURIComponent(username).toLowerCase()}`].segments[0].stats.kdRatio.value;
    return kd;
}


module.exports = { getTokens, getProfile, getUserKD }