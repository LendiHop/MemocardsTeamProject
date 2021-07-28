import React from 'react';
import {FormikProps} from 'formik';
import {Button, FormControl, FormGroup, FormLabel, Grid, Paper, TextField} from "@material-ui/core";
import {InitialValueType} from "./EnterNewPasswordContainer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {Redirect} from "react-router-dom";
import {createNewPasswordAC} from "../../../n1-main/m2-bll/reducers/auth-reducer";


type PropsType = {
    formik: FormikProps<InitialValueType>
}

export const EnterNewPassword: React.FC<PropsType> = ({formik}) => {

    const isNewPassword = useSelector<AppRootStateType, boolean>((state) => state.auth.isNewPassword)
    const dispatch = useDispatch()
    if (isNewPassword) {
        return <Redirect to={'/login'}/>
        dispatch(createNewPasswordAC(false))
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


                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel>
                                <h2 style={{textAlign: 'center'}}>Sign up</h2>
                            </FormLabel>
                            <FormGroup>

                                <TextField
                                    type="password"
                                    label="Password"
                                    margin="normal"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password &&
                                <div style={{color: 'red'}}>{formik.errors.password}</div>}
                                <p>Create new password and we will send you further instructions to email</p>

                                <div>

                                    <Button type={'submit'} variant={'contained'} color={'primary'}
                                            style={{
                                                marginTop: '70px',
                                                marginLeft: '100px',
                                                borderRadius: '30px'
                                            }}>create new password</Button>
                                </div>

                            </FormGroup>
                        </FormControl>
                    </form>

                </Grid>
            </Paper>
        </Grid>
    );
}

