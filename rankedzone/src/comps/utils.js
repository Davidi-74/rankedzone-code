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
                uno
                username
                clantag
                team
                kills
                deaths
                matchKDRatio
                totalXp
                headshots
                teamPlacement
                damageDone
                damageTaken
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
    console.log({ statType, stat });
    switch (statType) {
        case "kd": {
            if (stat < 0.53) {
                return "wood"
            }
            if (stat >= 0.53 && stat < 0.74) {
                return "bronze"
            }
            if (stat >= 0.74 && stat < 0.92) {
                return "silver"
            }
            if (stat >= 0.92 && stat < 1.14) {
                return "gold"
            }
            if (stat >= 1.14 && stat < 2.08) {
                return "platinum"
            }
            if (stat >= 2.08 && stat < 3.57) {
                return "damascus"
            }
            if (stat >= 3.57) {
                return "obsidian"
            }
        }

        case "kills": {
            if (stat < 100) {
                return "wood"
            }
            if (stat >= 100 && stat < 450) {
                return "bronze"
            }
            if (stat >= 450 && stat < 1024) {
                return "silver"
            }
            if (stat >= 1024 && stat < 2075) {
                return "gold"
            }
            if (stat >= 2075 && stat < 7616) {
                return "platinum"
            }
            if (stat >= 7616 && stat < 12875) {
                return "damascus"
            }
            if (stat >= 12875) {
                return "obsidian"
            }
        }

        case "wins": {
            if (stat < 1) {
                return "wood"
            }
            if (stat >= 1 && stat < 3) {
                return "bronze"
            }
            if (stat >= 3 && stat < 8) {
                return "silver"
            }
            if (stat >= 8 && stat < 19) {
                return "gold"
            }
            if (stat >= 19 && stat < 105) {
                return "platinum"
            }
            if (stat >= 105 && stat < 232) {
                return "damascus"
            }
            if (stat >= 232) {
                return "obsidian"
            }
        }

        case "winPercentage": {
            if (stat < 0.19) {
                return "wood"
            }
            if (stat >= 0.19 && stat < 0.99) {
                return "bronze"
            }
            if (stat >= 0.99 && stat < 1.89) {
                return "silver"
            }
            if (stat >= 1.89 && stat < 3.13) {
                return "gold"
            }
            if (stat >= 3.13 && stat < 9.72) {
                return "platinum"
            }
            if (stat >= 9.72 && stat < 25) {
                return "damascus"
            }
            if (stat >= 25) {
                return "obsidian"
            }
        }

        case "killsPerGame": {
            if (stat < 1.42) {
                return "wood"
            }
            if (stat >= 1.42 && stat < 1.96) {
                return "bronze"
            }
            if (stat >= 1.96 && stat < 2.43) {
                return "silver"
            }
            if (stat >= 2.43 && stat < 3.02) {
                return "gold"
            }
            if (stat >= 3.02 && stat < 5.31) {
                return "platinum"
            }
            if (stat >= 5.31 && stat < 8.93) {
                return "damascus"
            }
            if (stat >= 8.93) {
                return "obsidian"
            }
        }
        default: return "default"
    }

}

export default { getProfile, searchProfile, getLifetimeStats, getWeeklyStats, getMatches, getMatchDetails, showSelectedValueIcon, getRankingDesign }