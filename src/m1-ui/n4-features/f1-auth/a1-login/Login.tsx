import React from 'react';
import s from './Login.module.css';
import {FormikProps} from "formik";
import {Link} from "react-router-dom";
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import {FormikLoginInitValues} from "./LoginContainer";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

type TProps = {
    formik: FormikProps<FormikLoginInitValues>
    showPass: boolean
    handleClickShowPassword: () => void
}

export const Login: React.FC<TProps> = ({formik,
                                        showPass, handleClickShowPassword}) => {
    console.log('login')
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
                            <FormControl >
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPass ? 'text' : 'password'}
                                    {...formik.getFieldProps('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}

                                            >
                                                {showPass ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
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
                            <Button type='submit' variant='contained' color='secondary'
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