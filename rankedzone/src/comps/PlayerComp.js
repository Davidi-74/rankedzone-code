import { useState } from 'react'
import { Button, MenuItem, Select, TextField, Container, Grid, Box } from '@material-ui/core'
import utils from './utils'
import LifetimeComp from './LifetimeComp'
import WeeklyComp from './WeeklyComp'
import MatchesComp from './MatchesComp'
import { BattleIcon, PSNIcon, XBLIcon } from '../mui/icons'

const PlayerComp = (props) => {
    const [username, setUsername] = useState(props.match.params.username);
    const [platform, setPlatform] = useState(props.match.params.platform)



    return (
        <Container>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" >
                <Grid item xs={12}>
                    <h1>
                        {utils.showSelectedValueIcon(platform)} {decodeURIComponent(username)}
                    </h1>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box>
                        <LifetimeComp username={username} platform={platform} />
                    </Box>
                </Grid>
                <Grid container item xs={12} md={9} justify="center">
                    <Grid xs={12}>
                        <WeeklyComp username={username} platform={platform} />
                    </Grid>
                    <Grid item xs={12}>
                        <MatchesComp username={username} platform={platform} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PlayerComp