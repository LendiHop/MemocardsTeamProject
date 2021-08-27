import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/b0-store/redux-store";
import {logoutTC} from "../../m2-bll/b1-reducers/auth-reducer";
import {RequestStatusType} from "../../m2-bll/b1-reducers/app-reduser";
import {NavLink} from 'react-router-dom';
import {PATH} from "../n3-routes/Routes";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {ProfileDataType} from "../../m2-bll/b1-reducers/profile-reducer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export const Header = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const profile = useSelector<AppRootStateType, ProfileDataType>((state) => state.profile);

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC());
    }, [dispatch])

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Memocards
                    </Typography>
                    {isLoggedIn &&
                    <div>
                        <Button
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            startIcon={<AccountCircle/>}
                            color="inherit"
                            disabled={status === "loading"}
                            onClick={handleMenu}>{profile.name}
                        </Button>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <NavLink to={PATH.PROFILE}><MenuItem onClick={handleClose}>Profile</MenuItem></NavLink>
                            <NavLink to={PATH.PACKS_LIST}><MenuItem onClick={handleClose}>Pack List</MenuItem></NavLink>
                            <NavLink to={PATH.LOGIN}><MenuItem onClick={() => {
                                handleClose();
                                logoutHandler();
                            }}>Log Out</MenuItem></NavLink>
                        </Menu>
                    </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
