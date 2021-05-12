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
                damageDone
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

export default { getProfile, searchProfile, getLifetimeStats, getWeeklyStats, getMatches, getMatchDetails }