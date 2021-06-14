import { Grid } from "@material-ui/core"
import Skeleton from '@material-ui/lab/Skeleton';
import { useMediaQuery, useTheme } from "@material-ui/core";

const SessionSummarySkel = (props) => {
    const theme = useTheme();
    const screenSize = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Grid container direction="row" justify="center" alignItems="stretch" spacing={1} style={{ width: screenSize ? 621.1 : 530.4 }}>
            <Grid item xs={12} >
                <Skeleton variant="rect" height={79.2} />
            </Grid>
            <Grid item xs={12} md={4} >
                <Skeleton variant="rect" height={79.2} />
            </Grid>
            <Grid item xs={6} md={4}>
                <Skeleton variant="rect" height={79.2} />
            </Grid>
            <Grid item xs={6} md={4}>
                <Skeleton variant="rect" height={79.2} />
            </Grid>
        </Grid>
    )
}

export default SessionSummarySkel