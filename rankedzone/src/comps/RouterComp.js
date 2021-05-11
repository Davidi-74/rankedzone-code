import { Route, Switch } from "react-router-dom"
import HomePage from './HomePage'
import PlayerComp from "./PlayerComp";
import SpecificMatchComp from "./SpecificMatchComp";

const RouterComp = (props) => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/player/:platform/:username" component={PlayerComp} />
                <Route path="/match/:matchID/:uno" component={SpecificMatchComp} />
            </Switch>
        </div>
    )
}

export default RouterComp;