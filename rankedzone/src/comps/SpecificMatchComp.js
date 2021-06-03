import { Container } from "@material-ui/core"
import { useEffect, useState } from "react"
import TeamComp from "./TeamComp";
import utils from './utils'

const SpecificMatchComp = (props) => {
    const [matchID, setMatchID] = useState(props.match.params.matchID);
    const [uno, setUno] = useState(props.match.params.uno);
    const [teams, setTeams] = useState([]);
    const [matchData, setMatchData] = useState("");

    const getMatch = async () => {
        let resp = await utils.getMatchDetails(matchID);
        console.log(resp);
        let obj = {
            utcStartSeconds: resp.utcStartSeconds,
            mode: resp.mode,
            playerCount: resp.playerCount
        }
        setMatchData(obj);
        setTeams(resp.teams)
    }

    useEffect(() => {
        getMatch();
    }, [matchID])

    console.log(teams);
    return (
        <Container>
            <h3>{utils.modeName(matchData.mode)}</h3>
            {
                teams.length > 0 ?
                    teams.map((team, index) => {
                        return <TeamComp key={team[0].team} team={team} placement={index} />
                    })
                    : ""
            }
        </Container>
    )
}

export default SpecificMatchComp