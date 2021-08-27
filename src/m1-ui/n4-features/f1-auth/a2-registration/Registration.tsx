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
import {InitialValueType} from "./RegistrationContainer";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import {Visibility, VisibilityOff} from "@material-ui/icons";

type PropsType = {
    formik: FormikProps<InitialValueType>
    showPass1: boolean
    handleClickShowPassword1: () => void
    showPass2: boolean
    handleClickShowPassword2: () => void
}

export const Registration: React.FC<PropsType> = ({formik, showPass1, handleClickShowPassword1,
                                                  showPass2, handleClickShowPassword2}) => {

    return (
        <Grid container justifyContent={"center"}>
            <Paper elevation={1} style={{
                padding: '20px',
                borderRadius: '5px',
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
                                    label="Email"
                                    margin="normal"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email &&
                                <div style={{color: 'red'}}>{formik.errors.email}</div>}
                                {/*<TextField*/}
                                {/*    type="password"*/}
                                {/*    label="Password"*/}
                                {/*    margin="normal"*/}
                                {/*    {...formik.getFieldProps('password')}*/}
                                {/*/>*/}
                                <FormControl>
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={showPass1 ? 'text' : 'password'}
                                        {...formik.getFieldProps('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword1}

                                                >
                                                    {showPass1 ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                {formik.touched.password && formik.errors.password &&
                                <div style={{color: 'red'}}>{formik.errors.password}</div>}

                                <FormControl>
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={showPass2 ? 'text' : 'password'}
                                        {...formik.getFieldProps('password2')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword2}

                                                >
                                                    {showPass2 ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                                {formik.touched.password2 && formik.errors.password2 &&
                                <div style={{color: 'red'}}>{formik.errors.password2}</div>}
                                <div>
                                    <Button type={'reset'} onClick={() => formik.resetForm()} variant={'contained'}
                                            color={'primary'}
                                            style={{marginTop: '70px', borderRadius: '30px'}}>Reset</Button>
                                    <Button type={'submit'} variant={'contained'} color={'primary'}
                                            style={{
                                                marginTop: '70px',
                                                marginLeft: '100px',
                                                borderRadius: '30px'
                                            }}>Confirm</Button>
                                </div>

                            </FormGroup>
                        </FormControl>
                    </form>

                </Grid>
            </Paper>
        </Grid>
    );
}

