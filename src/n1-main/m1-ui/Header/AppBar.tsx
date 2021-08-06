import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {ButtonGroup} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {onPacksTrueAC} from "../../m2-bll/reducers/cards-reduser";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function ButtonAppBar() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const onClickPacks = () => {

        dispatch(onPacksTrueAC(true))
    }
    const onClickProfile = () => {

        dispatch(onPacksTrueAC(false))
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" style={{color: "cadetblue", backgroundColor: 'bisque'}}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        it-incubator
                    </Typography>
                    <ButtonGroup size="large" variant="text" color="inherit" aria-label="text primary button group">
                        <Button onClick={onClickPacks}>Packs list</Button>
                        <Button onClick={onClickProfile}>Profile</Button>

                    </ButtonGroup>


                    {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
            </AppBar>
        </div>
    );
}
