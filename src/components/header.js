import React from 'react';
import { AppBar, Link, Grid } from '@material-ui/core/';
import { withStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';


const styles = {
    root: {
        height: '50px'
    },
    links: {
        color: grey[50],
        marginLeft: '20px'
    }
}
function Header(props) {
    const { classes } = props
    return (
            <AppBar position="static" className={classes.root}>
                <Grid 
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    className={classes.root}
                >
                    <Grid item xs={2}>
                        <Link href="/" className={classes.links}>Forms list</Link>
                    </Grid>
                    <Grid item xs={2}>
                        <Link href="/form/new" className={classes.links}>Create form</Link>
                    </Grid>
                </Grid>
            </AppBar>
    )
}

export default withStyles(styles)(Header)