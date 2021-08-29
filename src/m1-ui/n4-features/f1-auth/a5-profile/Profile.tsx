import React, {useState} from 'react';
import logo from '../../../../logo.svg';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import {Redirect} from 'react-router-dom';
import {ProfileDataType} from '../../../../m2-bll/b1-reducers/profile-reducer';
import {RequestStatusType} from "../../../../m2-bll/b1-reducers/app-reduser";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import {UpdateProfileModalContainer} from "../../f4-modals/UpdateProfileModalContainer";
import {Avatar} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '93vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        paper: {
            minWidth: 300,
            padding: 20,
        },
        avatar: {
            width: theme.spacing(35),
            height: theme.spacing(35),
        },
    }),
);

export const Profile: React.FC = () => {
    const classes = useStyles();
    const profile = useSelector<AppRootStateType, ProfileDataType>((state) => state.profile);
    console.log('profile', profile)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
    const updateProfileHandler = () => {
        setShowUpdateProfileModal(true);
    };

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <Container className={classes.root}>
            {status === "loading" && <LinearProgress color="secondary"/>}

            <Paper className={classes.paper}>
                <Grid container spacing={3} direction='column' justifyContent='center' alignItems='center'>
                    <Grid item container justifyContent='flex-end'>
                        <Grid item>
                            <IconButton onClick={updateProfileHandler}><EditIcon/></IconButton>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Avatar alt='avatar' src={profile.avatar || logo} className={classes.avatar}/>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" gutterBottom>Hello, {profile.name}!</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" gutterBottom>You have <span style={{color: 'red', fontSize: '1.1em'}}>{profile.publicCardPacksCount}</span> packs!</Typography>
                    </Grid>
                </Grid>
            </Paper>

            {showUpdateProfileModal &&
            <UpdateProfileModalContainer show={showUpdateProfileModal} setShow={setShowUpdateProfileModal} profileName={profile.name}/>}
        </Container>
    );
}
