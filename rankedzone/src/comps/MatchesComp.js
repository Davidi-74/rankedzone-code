import { Container } from "@material-ui/core"
import { useEffect, useState } from "react"
import utils from './utils'
import MiniMatchSummary from './MiniMatchSummary'

const MatchesComp = (props) => {
    const [matches, setMatches] = useState([]);
    const [userData, setUserData] = useState("");

    const getMatches = async () => {
        let data = await utils.getMatches(decodeURIComponent(props.username), props.platform);
        setUserData({ uno: data.uno, username: data.username, clantag: data.clantag ? data.clantag : null });
        setMatches(data.matches);
    }

    const splitToSessions = () => {
        let prevTime = 0;
        let sessions = [];
        let currentSession = [];
        matches.forEach((match, index) => {
            if (index === 0) {
                prevTime = match.utcStartSeconds;
                currentSession.push(match)
            }
            else {
                if (prevTime - match.utcStartSeconds < 7200) {
                    prevTime = match.utcStartSeconds;
                    currentSession.push(match)
                }
                else {
                    prevTime = match.utcStartSeconds;
                    currentSession.push(match)
                    sessions.push(currentSession);
                    currentSession = [];
                }
            }
        })

    }

    useEffect(() => {
        getMatches();
    }, [])

    useEffect(() => {
        splitToSessions();
    }, [matches])

    return (
        <div>
            <h3 style={{ color: "white" }}>Last 20 Matches</h3>
            {
                matches.length > 0 ?
                    matches.map(match => {
                        return <MiniMatchSummary key={match.matchID} uno={userData.uno} matchData={match} />
                    })
                    :
                    ""
            }
        </div>
    )
}

export default MatchesComp