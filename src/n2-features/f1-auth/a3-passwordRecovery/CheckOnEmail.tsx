import React from 'react'
import {Grid, Link, Paper, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {isShowCheckEmailAC} from "../../../n1-main/m2-bll/reducers/auth-reducer";
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';

export const CheckOnEmail: React.FC = () => {

    const email = useSelector<AppRootStateType, string>((state) => state.auth.email)

    const dispatch = useDispatch()
    const linkCallback = () => {

        dispatch(isShowCheckEmailAC(false))
    }
    return (
        <Grid container justifyContent={"center"}>
            <Paper elevation={1} style={{
                padding: '20px',
                borderRadius: '5px',
                width: '300px',
                height: '200px',
                margin: '200px 0'
            }}>
                <Grid container  direction='column' justifyContent="center"
                      alignItems="center" >
                <Grid item xs={5}>

                    <Typography>

                        <Link href={`mailto:${email}`} onClick={linkCallback} variant="body2">
                            <EmailTwoToneIcon style={{margin: '0 auto'}}/>

                        </Link>
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <div>
                        {`We've sent an Email with instructions to email: ${email}`}
                    </div>

                </Grid>
                </Grid>
            </Paper>
        </Grid>

    )
}
