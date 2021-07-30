import React, {useEffect} from 'react';
import s from './PasswordRecovery.module.css';
import {Button, FormControl, FormGroup, FormLabel, Grid, Link, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {ForgotThunk} from "../../../n1-main/m2-bll/reducers/auth-reducer";
import {useFormik} from "formik";


type FormikType = {
    email?: string | undefined
}
export const PasswordRecovery: React.FC = () => {
    const dispatch = useDispatch()

    const formikForgotAuth = useFormik({
        initialValues: {
            email: ''

        },
        validate: (values) => {
            const errors: FormikType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(ForgotThunk(values.email))
            formikForgotAuth.resetForm()

        },


    })

    return (
        <div className={s.recovery}>
            <Grid justifyContent="center">
            <Grid item xs={12}
                  container
                  spacing={1}
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                <form onSubmit={formikForgotAuth.handleSubmit}>

                    <FormControl className={s.form}>
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
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Send Instructions</Button>
                            <p>Did you remember your password?</p>

                        </FormGroup>
                    </FormControl>
                </form>


            </Grid>
            </Grid>


        </div>
    );
}
