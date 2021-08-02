import React from 'react';
import './PasswordRecovery.module.css';
import {Button, FormControl, FormGroup, FormLabel, Grid, Link, Paper, TextField, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {ForgotThunk} from "../../../n1-main/m2-bll/reducers/auth-reducer";
import {useFormik} from "formik";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";

type FormikInitialValueType = {
    email: string
}
export const PasswordRecovery = () => {
    const dispatch = useDispatch()
    const showCheckEmail = useSelector<AppRootStateType, boolean>((state => state.auth.showCheckEmail))

    const formikForgotAuth = useFormik<FormikInitialValueType>({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            //@ts-ignore
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(ForgotThunk(values.email))
            formikForgotAuth.resetForm()
        },

    })
    if (showCheckEmail) {
        return <Redirect to={'/check-on-email'}/>
    }
    return (
        <div className="PasswordRecovery">
            <Grid item xs zeroMinWidth
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                <Paper elevation={1} style={{
                    padding: '20px',
                    borderRadius: '5px',
                    width: '300px',

                    margin: '200px 0'
                }}>
                    <form onSubmit={formikForgotAuth.handleSubmit}>
                        <FormControl>
                            <FormLabel>
                                <h1>IT-incubator</h1>
                                <p>Forgot your password?</p>

                            </FormLabel>
                            <FormGroup>
                                <TextField
                                    label="Email"
                                    margin="normal"
                                    {...formikForgotAuth.getFieldProps('email')}

                                />
                                {formikForgotAuth.touched.email && formikForgotAuth.errors.email
                                    ? <div style={{color: 'red'}}>{formikForgotAuth.errors.email}</div>
                                    : null}

                                <p>Enter your email address and we will send you further instructions</p>
                                <div>
                                    <Button type={'submit'} onClick={() => {
                                    }} variant={'contained'} color={'primary'}
                                            style={{
                                                marginTop: '70px',
                                                marginLeft: '100px',
                                                borderRadius: '30px'
                                            }}>Send Instructions</Button>
                                </div>

                                <p>Did you remember your password?</p>

                                <Typography>

                                    <Link href="#/login" variant="body2">
                                        {'Try logging in'}
                                    </Link>

                                </Typography>

                            </FormGroup>

                        </FormControl>
                    </form>
                </Paper>
            </Grid>


        </div>
    );
}
