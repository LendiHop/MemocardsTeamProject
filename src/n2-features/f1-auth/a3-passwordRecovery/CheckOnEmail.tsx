import React from 'react'
import {Grid, Link, Paper, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {isShowCheckEmailAC} from "../../../n1-main/m2-bll/reducers/auth-reducer";


export const CheckOnEmail: React.FC = () => {

    const email = useSelector<AppRootStateType, string>((state) => state.auth.email)

    const dispatch = useDispatch()
    const linkCallback = () => {
        debugger
        dispatch(isShowCheckEmailAC(false))
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
                        <Link href={`mailto:${email}`} onClick={linkCallback} variant="body2">
                            {`Check email : ${email}`}
                        </Link>
                    </Typography>
                </Grid>
            </Paper>
        </Grid>

    )
}
