import { BattleIcon, PSNIcon, XBLIcon } from '../mui/icons'
import ListItemIcon from '@material-ui/core/ListItemIcon'

const serverURL = "http://localhost:8000/graphql"

const getProfile = async (username, platform) => {

    const weeklyModeData = `
        kdRatio
        kills
        deaths
        avgLifetime
        score
        headshots
        killsPerGame
        scorePerMinute
        scorePerGame
        timePlayed
        headshotPercentage
        matchesPlayed
        damageDone
        damageTaken
    `

    const query = `
    query GetProfile($username: String, $platform: String) {
        getProfile(username: $username, platform: $platform) {
            username
            platform
            level
            prestige
            lifetime {
                kdRatio
                wins
                kills
                deaths
                downs
                topTen
                topFive
                contracts
                revives
                score
                timePlayed
                gamesPlayed
                scorePerMinute
            }
            weekly {
                all {
                    ${weeklyModeData}
                }
                brSolo {
                    ${weeklyModeData}
                }
                brDous {
                    ${weeklyModeData}
                }
                brTrios {
                    ${weeklyModeData}
                }
                brQuads {
                    ${weeklyModeData}
                }
                rebirthDous {
                    ${weeklyModeData}
                }
                rebirthTrios {
                    ${weeklyModeData}
                }
                rebirthQuads {
                    ${weeklyModeData}
                }
            }
        }
    }`

    let resp = await fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { username, platform }
        })
    }).then(r => r.json())
        .then(data => { return data });

    if (resp.errors) {
        return resp
    }
    else {
        return resp.data.getProfile;
    }
}

const searchProfile = async (username, platform) => {

    const query = `
    query GetProfile($username: String, $platform: String) {
        getProfile(username: $username, platform: $platform) {
            username
            platform
        }
    }`

    let resp = await fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { username, platform }
        })
    }).then(r => r.json())
        .then(data => { return data });

    if (resp.errors) {
        return resp
    }
    else {
        return resp.data.getProfile;
    }
}

const getLifetimeStats = async (username, platform) => {
    const query = `
    query GetProfile($username: String, $platform: String) {
        getProfile(username: $username, platform: $platform) {
            username
            platform
            level
            prestige
            lifetime {
                kdRatio
                wins
                kills
                deaths
                downs
                topTen
                topFive
                contracts
                revives
                score
                timePlayed
                gamesPlayed
                scorePerMinute
            }
        }
    }`

    let resp = await fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { username, platform }
        })
    }).then(r => r.json())
        .then(data => { return data });

    if (resp.errors) {
        return resp
    }
    else {
        return resp.data.getProfile;
    }
}

const getWeeklyStats = async (username, platform) => {
    const weeklyModeData = `
        kdRatio
        kills
        deaths
        avgLifetime
        score
        headshots
        killsPerGame
        scorePerMinute
        scorePerGame
        timePlayed
        headshotPercentage
        matchesPlayed
        damageDone
        damageTaken
    `

    const query = `
    query GetProfile($username: String, $platform: String) {
        getProfile(username: $username, platform: $platform) {
            username
            platform
            level
            prestige
            weekly {
                all {
                    ${weeklyModeData}
                }
                brSolo {
                    ${weeklyModeData}
                }
                brDous {
                    ${weeklyModeData}
                }
                brTrios {
                    ${weeklyModeData}
                }
                brQuads {
                    ${weeklyModeData}
                }
                rebirthDous {
                    ${weeklyModeData}
                }
                rebirthTrios {
                    ${weeklyModeData}
                }
                rebirthQuads {
                    ${weeklyModeData}
                }
                resurgenceDous {
                    ${weeklyModeData}
                }
                resurgenceTrios {
                    ${weeklyModeData}
                }
                resurgenceQuads {
                    ${weeklyModeData}
                }
            }
        }
    }`

    let resp = await fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { username, platform }
        })
    }).then(r => r.json())
        .then(data => { return data });

    if (resp.errors) {
        return resp
    }
    else {
        return resp.data.getProfile;
    }
}

const getMatches = async (username, platform) => {
    const query = `
    query GetMatches($username: String, $platform: String) {
        getMatchesByPlayer(username: $username, platform: $platform) {
            uno
            username
            clantag
            matches {
                matchID
                mode
                utcStartSeconds
                playerStats {
                kills
                deaths
                damageDone
                damageTaken
                headshots
                kdRatio
                }
                teamStats {
                    placement
                    team
                }
            }
        }
    }
    `

    let resp = await fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { username, platform }
        })
    }).then(r => r.json())
        .then(data => { return data });

    if (resp.errors) {
        return resp
    }
    else {
        return resp.data.getMatchesByPlayer;
    }
}

const getMatchDetails = async (matchID) => {
    const query = `
    query GetMatch($matchID: String) {
        getMatchByID(id: $matchID) {
            utcStartSeconds
            mode
            playerCount
            teams {
                players {
                    uno
                username
                clantag
                team
                kills
                deaths
                kdRatio
                totalXp
                headshots
                teamPlacement
                damageDone
                damageTaken
                }
                teamStats {
                    kills
                    deaths
                    damageDone
                    damageTaken
                    headshots
                }
            }
        }
    }
    `

    let resp = await fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { matchID }
        })
    }).then(r => r.json())
        .then(data => { return data });

    if (resp.errors) {
        return resp
    }
    else {
        return resp.data.getMatchByID;
    }
}

const showSelectedValueIcon = (value) => {
    if (value === "battle") {
        return <BattleIcon />
    }
    if (value === "psn") {
        return <PSNIcon />
    }
    if (value === "xbl") {
        return <XBLIcon />
    }
}


const getRankingDesign = (statType, stat) => {
    switch (statType) {
        case "kd": {
            if (stat < 0.53) {
                return { design: "wood", nextLevel: ["bronze", 0.53] }
            }
            if (stat >= 0.53 && stat < 0.74) {
                return { design: "bronze", nextLevel: ["silver", 0.74] }
            }
            if (stat >= 0.74 && stat < 0.92) {
                return { design: "silver", nextLevel: ["gold", 0.92] }
            }
            if (stat >= 0.92 && stat < 1.14) {
                return { design: "gold", nextLevel: ["platinum", 1.14] }
            }
            if (stat >= 1.14 && stat < 2.08) {
                return { design: "platinum", nextLevel: ["damascus", 2.08] }
            }
            if (stat >= 2.08 && stat < 3.57) {
                return { design: "damascus", nextLevel: ["obsidian", 3.57] }
            }
            if (stat >= 3.57) {
                return { design: "obsidian" }
            }
        }

        case "kills": {
            if (stat < 100) {
                return { design: "wood", nextLevel: ["bronze", 100] }
            }
            if (stat >= 100 && stat < 450) {
                return { design: "bronze", nextLevel: ["silver", 450] }
            }
            if (stat >= 450 && stat < 1024) {
                return { design: "silver", nextLevel: ["gold", 1024] }
            }
            if (stat >= 1024 && stat < 2075) {
                return { design: "gold", nextLevel: ["platinum", 2075] }
            }
            if (stat >= 2075 && stat < 7616) {
                return { design: "platinum", nextLevel: ["damascus", 7616] }
            }
            if (stat >= 7616 && stat < 12875) {
                return { design: "damascus", nextLevel: ["obsidian", 12875] }
            }
            if (stat >= 12875) {
                return { design: "obsidian" }
            }
        }

        case "weeklyKills": {
            if (stat < 100) {
                return { design: "wood", nextLevel: ["bronze", 100] }
            }
            if (stat >= 100 && stat < 250) {
                return { design: "bronze", nextLevel: ["silver", 250] }
            }
            if (stat >= 250 && stat < 500) {
                return { design: "silver", nextLevel: ["gold", 500] }
            }
            if (stat >= 500 && stat < 800) {
                return { design: "gold", nextLevel: ["platinum", 800] }
            }
            if (stat >= 800 && stat < 1000) {
                return { design: "platinum", nextLevel: ["damascus", 1000] }
            }
            if (stat >= 1000 && stat < 1200) {
                return { design: "damascus", nextLevel: ["obsidian", 1200] }
            }
            if (stat >= 1200) {
                return { design: "obsidian" }
            }
        }

        case "wins": {
            if (stat < 1) {
                return { design: "wood", nextLevel: ["bronze", 1] }
            }
            if (stat >= 1 && stat < 3) {
                return { design: "bronze", nextLevel: ["silver", 3] }
            }
            if (stat >= 3 && stat < 8) {
                return { design: "silver", nextLevel: ["gold", 8] }
            }
            if (stat >= 8 && stat < 19) {
                return { design: "gold", nextLevel: ["platinum", 19] }
            }
            if (stat >= 19 && stat < 105) {
                return { design: "platinum", nextLevel: ["damascus", 105] }
            }
            if (stat >= 105 && stat < 232) {
                return { design: "damascus", nextLevel: ["obsidian", 232] }
            }
            if (stat >= 232) {
                return { design: "obsidian" }
            }
        }

        case "winPercentage": {
            if (stat < 0.19) {
                return { design: "wood", nextLevel: ["bronze", 0.19] }
            }
            if (stat >= 0.19 && stat < 0.99) {
                return { design: "bronze", nextLevel: ["silver", 0.99] }
            }
            if (stat >= 0.99 && stat < 1.89) {
                return { design: "silver", nextLevel: ["gold", 1.89] }
            }
            if (stat >= 1.89 && stat < 3.13) {
                return { design: "gold", nextLevel: ["platinum", 3.13] }
            }
            if (stat >= 3.13 && stat < 9.72) {
                return { design: "platinum", nextLevel: ["damascus", 9.72] }
            }
            if (stat >= 9.72 && stat < 25) {
                return { design: "damascus", nextLevel: ["obsidian", 25] }
            }
            if (stat >= 25) {
                return { design: "obsidian" }
            }
        }

        case "killsPerGame": {
            if (stat < 1.42) {
                return { design: "wood", nextLevel: ["bronze", 1.42] }
            }
            if (stat >= 1.42 && stat < 1.96) {
                return { design: "bronze", nextLevel: ["silver", 1.96] }
            }
            if (stat >= 1.96 && stat < 2.43) {
                return { design: "silver", nextLevel: ["gold", 2.43] }
            }
            if (stat >= 2.43 && stat < 3.02) {
                return { design: "gold", nextLevel: ["platinum", 3.02] }
            }
            if (stat >= 3.02 && stat < 5.31) {
                return { design: "platinum", nextLevel: ["damascus", 5.31] }
            }
            if (stat >= 5.31 && stat < 8.93) {
                return { design: "damascus", nextLevel: ["obsidian", 8.93] }
            }
            if (stat >= 8.93) {
                return { design: "obsidian" }
            }
        }
        default: return "default"
    }

}

const modeName = (mode) => {
    switch (mode) {
        case "br_brsolo": return "BR SOLO";
        case "br_brduos": return "BR DOUS";
        case "br_brtrios": return "BR TRIOS";
        case "br_brquads": return "BR QUADS";
        case "br_rebirth_rbrthduos": return "REBIRTH RESURGENCE DOUS";
        case "br_rebirth_rbrthtrios": return "REBIRTH RESURGENCE TRIOS";
        case "br_rebirth_rbrthquad": return "REBIRTH RESURGENCE QUADS";
        case "br_rebirth_resurgence_dous": return "VERDANSK RESURGENCE DOUS";
        case "br_rebirth_resurgence_trios": return "VERDANSK RESURGENCE TRIOS";
        case "br_rebirth_resurgence_quads": return "VERDANSK RESURGENCE QUADS";
        case "br_bodycount_pwergrb": return "POWER GRAB";
        default: return mode;
    }
}

const ordinalNumbers = (num) => {
    let numString = String(num);
    let lastNum = numString[numString.length - 1];
    if (numString == 11 || numString == 12 || numString == 13 || numString == 111 || numString == 112 || numString == 113) {
        return num + "th"
    }
    if (lastNum == 1) {
        return num + "st"
    }
    if (lastNum == 2) {
        return num + "nd"
    }
    if (lastNum == 3) {
        return num + "rd"
    }
    return num + "th"
}

const formatDate = (milis) => {
    let formatMilis = parseInt(milis + "000")
    let matchStart = new Date(formatMilis);
    let time = matchStart.toTimeString().substring(0, 5);
    let date = matchStart.toDateString();
    return String(date.substring(0, 3) + ", " + date.substring(4, 10) + " | " + time);
}

export default { getProfile, searchProfile, getLifetimeStats, getWeeklyStats, getMatches, getMatchDetails, showSelectedValueIcon, getRankingDesign, modeName, ordinalNumbers, formatDate }