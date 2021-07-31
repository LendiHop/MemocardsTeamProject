import React from 'react';
import s from './Login.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {useFormik} from "formik";
import {Redirect, Link} from "react-router-dom";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    Paper,
    TextField
} from "@material-ui/core";
import {login} from './reducer/reducer';

export const Login = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(login(values));
            formik.resetForm();
        },
    })

    if (isLoggedIn) {
        return <Redirect to={"/profile"}/>
    }

    return <Grid container justifyContent="center" alignItems="center" className={s.container}>
        <Grid item>
            <Paper style={{padding: '15px'}}>
                <h2>Sign In</h2>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup className={s.formGroup}>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email ?
                                <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox
                                    {...formik.getFieldProps("rememberMe")}
                                    checked={formik.values.rememberMe}
                                />}
                            />
                            <div className={s.forgot}><Link to="/password-recovery">Forgot Password</Link></div>
                            <Button type='submit' variant='contained' color='primary'
                                    className={s.loginBtn}>Login</Button>
                            <div className={s.singUpQ}><p>Don't have an account?</p></div>
                            <div className={s.singUp}><Link to="/registration">Sing Up</Link></div>
                        </FormGroup>
                    </FormControl>
                </form>
            </Paper>
        </Grid>
    </Grid>
}