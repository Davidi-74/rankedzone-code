import { Grid } from "@material-ui/core"
import Skeleton from '@material-ui/lab/Skeleton';

const WeeklyCompSkel = (props) => {

    return (
        <Grid container direction="row" justify="center" alignItems="stretch" spacing={1} style={{ margin: 1 }}>
            <Grid item xs={12} md={4} >
                <Skeleton variant="rect" height={79.2} />
            </Grid>
            <Grid item xs={6} md={4}>
                <Skeleton variant="rect" height={79.2} />
            </Grid>
            <Grid item xs={6} md={4}>
                <Skeleton variant="rect" height={79.2} />
            </Grid>
            <Grid item xs={6} md={3}>
                <Skeleton variant="rect" height={49.6} />
            </Grid>
            <Grid item xs={6} md={3}>
                <Skeleton variant="rect" height={49.6} />
            </Grid>
            <Grid item xs={6} md={3}>
                <Skeleton variant="rect" height={49.6} />
            </Grid>
            <Grid item xs={6} md={3}>
                <Skeleton variant="rect" height={49.6} />
            </Grid>
            <Grid item xs={6} md={3}>
                <Skeleton variant="rect" height={49.6} />
            </Grid>
            <Grid item xs={6} md={3}>
                <Skeleton variant="rect" height={49.6} />
            </Grid>
            <Grid item xs={6} md={3}>
                <Skeleton variant="rect" height={49.6} />
            </Grid>
            <Grid item xs={6} md={3}>
                <Skeleton variant="rect" height={49.6} />
            </Grid>
        </Grid>
    )
}

export default WeeklyCompSkel