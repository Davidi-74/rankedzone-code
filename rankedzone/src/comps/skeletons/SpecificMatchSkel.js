import { Grid } from "@material-ui/core"
import Skeleton from '@material-ui/lab/Skeleton';
import { useMediaQuery, useTheme } from "@material-ui/core";

const SpecificMatchSkel = (props) => {
    const theme = useTheme();
    const screenSize = useMediaQuery(theme.breakpoints.up('md'));

    return (
        screenSize ?
            <Grid container direction="column" alignItems="center" jusity="center" spacing={1} style={{ marginTop: "30px" }}>
                <Grid item xs={12}>
                    <Skeleton width={500} height={37} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={200} height={37} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={1463} height={37} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={610} height={71} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={1463} height={320} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={1463} height={320} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={1463} height={320} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={1463} height={320} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={1463} height={320} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={1463} height={320} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={1463} height={320} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={1463} height={320} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={1463} height={320} />
                </Grid>
            </Grid>
            :
            <Grid container direction="column" alignItems="center" jusity="center" spacing={1} style={{ marginTop: "30px" }}>
                <Grid item xs={12}>
                    <Skeleton width={300} height={25} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={200} height={21} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={443} height={37} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={451} height={142} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={443} height={360} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={443} height={360} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={443} height={360} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={443} height={360} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={443} height={360} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={443} height={360} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={443} height={360} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={443} height={360} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton width={443} height={360} />
                </Grid>
            </Grid>
    )
}

export default SpecificMatchSkel