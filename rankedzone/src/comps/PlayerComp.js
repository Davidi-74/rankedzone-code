import { useState } from 'react'
import { Button, MenuItem, Select, TextField, Container } from '@material-ui/core'
import utils from './utils'
import LifetimeComp from './LifetimeComp'
import WeeklyComp from './WeeklyComp'
import MatchesComp from './MatchesComp'

const PlayerComp = (props) => {
    const [username, setUsername] = useState(props.match.params.username);
    const [platform, setPlatform] = useState(props.match.params.platform)

    return (
        <Container>
            {username}, {platform}
            <LifetimeComp username={username} platform={platform} />
            <WeeklyComp username={username} platform={platform} />
            <MatchesComp username={username} platform={platform} />
        </Container>
    )
}

export default PlayerComp