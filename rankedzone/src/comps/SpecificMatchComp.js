import { Container } from "@material-ui/core"
import { useEffect, useState } from "react"
import utils from './utils'

const SpecificMatchComp = (props) => {
    const [matchID, setMatchID] = useState(props.match.params.matchID);
    const [uno, setUno] = useState(props.match.params.uno);
    const [teams, setTeams] = useState([]);
    const [matchData, setMatchData] = useState("");

    const getMatch = async () => {
        let resp = await utils.getMatchDetails(matchID);
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

        </Container>
    )
}

export default SpecificMatchComp