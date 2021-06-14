import { Grid } from "@material-ui/core"
import Skeleton from '@material-ui/lab/Skeleton';

const LifetimeCompSkel = (props) => {

    return (
        <Grid container direction="row" justify="center" alignItems="stretch" spacing={1}>
            <Grid item xs={12} >
                <Skeleton variant="rect" height={79.2} />
            </Grid>
            <Grid item xs={6}>
                <Skeleton variant="rect" height={79.2} />
            </Grid>
            <Grid item xs={6}>
                <Skeleton variant="rect" height={79.2} />
            </Grid>
            <Grid item xs={6}>
                <Skeleton variant="rect" height={79.2} />
            </Grid>
            <Grid item xs={6}>
                <Skeleton variant="rect" height={79.2} />
            </Grid>
            <Grid item xs={12}>
                <Skeleton variant="rect" height={37.17} />
            </Grid>
        </Grid>
    )
}

export default LifetimeCompSkel