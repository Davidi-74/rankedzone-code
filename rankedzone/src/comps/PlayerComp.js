import { useState } from 'react'
import { Button, MenuItem, Select, TextField, Container, Grid, Box, makeStyles } from '@material-ui/core'
import utils from './utils'
import LifetimeComp from './LifetimeComp'
import WeeklyComp from './WeeklyComp'
import MatchesComp from './MatchesComp'
import { BattleIcon, PSNIcon, XBLIcon } from '../mui/icons'
import isSticky from '../mui/stickyLifetime'

const PlayerComp = (props) => {
    const [username, setUsername] = useState(props.match.params.username);
    const [platform, setPlatform] = useState(props.match.params.platform);

    const stickyLifetime = isSticky();
    return (
        <Container>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" >
                <Grid item xs={12}>
                    <h1>
                        {utils.showSelectedValueIcon(platform)} {decodeURIComponent(username).toUpperCase()}
                    </h1>
                </Grid>
                <Grid item xs={12} md={3} className={stickyLifetime.root}>
                    <LifetimeComp username={username} platform={platform} />
                </Grid>
                <Grid item xs={12} md={9} justify="center">
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