import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import {useDispatch, useSelector} from "react-redux";
import {ForgotThunk} from "../../../../m2-bll/b1-reducers/auth-reducer";
import {useFormik} from "formik";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";

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
                                    }} variant={'contained'} color={'secondary'}
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
