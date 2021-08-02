import React from 'react';
import {FormikProps} from 'formik';
import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    Input,
    InputLabel,
    Paper,
    TextField
} from "@material-ui/core";
import {InitialValueType} from "./NewPasswordContainer";
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import {Visibility, VisibilityOff} from "@material-ui/icons";

type PropsType = {
    formik: FormikProps<InitialValueType>
    showPass: boolean
    handleClickShowPassword: () => void
}

export const NewPassword: React.FC<PropsType> = ({formik, showPass, handleClickShowPassword}) => {

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
                    <form onSubmit={formik.handleSubmit} >
                        <FormControl>
                            <FormLabel>
                                <h2 style={{textAlign: 'center'}}>Sign up</h2>
                            </FormLabel>
                            <FormGroup>
                                {/*<TextField*/}
                                {/*    type="password"*/}
                                {/*    label="Password"*/}
                                {/*    margin="normal"*/}
                                {/*    {...formik.getFieldProps('password')}*/}
                                {/*/>*/}
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

