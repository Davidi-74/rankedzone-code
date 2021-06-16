import { useState } from 'react'
import { Container, Grid, useMediaQuery, useTheme } from '@material-ui/core'
import utils from './utils'
import LifetimeComp from './LifetimeComp'
import WeeklyComp from './WeeklyComp'
import MatchesComp from './MatchesComp'
import isSticky from '../mui/stickyLifetime'

const PlayerComp = (props) => {
    const [username, setUsername] = useState(props.match.params.username);
    const [platform, setPlatform] = useState(props.match.params.platform);
    const theme = useTheme();
    const screenSize = useMediaQuery(theme.breakpoints.up('md'));

    const stickyLifetime = isSticky();
    return (
        <Container>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" >
                <Grid item xs={12}>
                    {screenSize ?
                        <h1>
                            {utils.showSelectedValueIcon(platform)} {decodeURIComponent(username).toUpperCase()}
                        </h1>
                        :
                        <h2>
                            <span style={{ verticalAlign: "-2px" }}>{utils.showSelectedValueIcon(platform)}</span> {decodeURIComponent(username).toUpperCase()}
                        </h2>}
                </Grid>
                <Grid item xs={12} md={3} className={stickyLifetime.root}>
                    <LifetimeComp username={username} platform={platform} />
                </Grid>
                <Grid container item xs={12} md={9} justify="center">
                    <Grid item xs={12}>
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