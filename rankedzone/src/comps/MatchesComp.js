import { Container } from "@material-ui/core"
import { useEffect, useState } from "react"
import utils from './utils'
import MiniMatchSummary from './MiniMatchSummary'

const MatchesComp = (props) => {
    const [matches, setMatches] = useState([]);
    const [userData, setUserData] = useState("");
    const [items, setItems] = useState([]);

    const getMatches = async () => {
        let data = await utils.getMatches(decodeURIComponent(props.username), props.platform);
        setUserData({ uno: data.uno, username: data.username, clantag: data.clantag ? data.clantag : null });
        setMatches(data.matches);
    }

    useEffect(() => {
        getMatches();
    }, [])

    useEffect(() => {
        let items = matches.map(match => {
            return <MiniMatchSummary uno={userData.uno} matchData={match} />
        })
        setItems(items);
    }, [matches])

    return (
        <div>
            <h3 style={{ color: "white" }}>Matches</h3>
            {items}
        </div>
    )
}

export default MatchesComp