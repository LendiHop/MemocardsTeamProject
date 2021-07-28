import React from 'react'
import {Grid, Link, Paper, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {createNewPasswordAC, isShowInfoMessageAC} from "../../../n1-main/m2-bll/reducers/auth-reducer";
import {Redirect} from "react-router-dom";


export const LinkOnEmail: React.FC = () => {

    const email = useSelector<AppRootStateType, string>((state => state.auth.email))
    const isNewPassword = useSelector<AppRootStateType, string>((state => state.auth.isNewPassword))
    const dispatch = useDispatch()
    const linkCallback = () => {
        debugger
        dispatch(isShowInfoMessageAC(false))
        dispatch(createNewPasswordAC(true))

    }
    if (isNewPassword) {
        return < Redirect to={'/set-new-password'}/>
    }
    return (
        <Grid container justifyContent={"center"}>
            <Paper elevation={1} style={{
                padding: '20px',
                borderRadius: '5px',
                width: '300px',
                height: '400px',
                margin: '200px 0'
            }}>
                <Grid item xs={12}>

                    <Typography>


                        <Link onClick={linkCallback} variant="body2">
                            {`Goto email : ${email}`}
                        </Link>

                    </Typography>
                </Grid>
            </Paper>
        </Grid>

    )
}
