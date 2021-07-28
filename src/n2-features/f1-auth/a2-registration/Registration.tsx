import React from 'react';
import './Registration.module.css';
import {FormikProps} from 'formik';
import {Button, FormControl, FormGroup, FormLabel, Grid, Paper, TextField} from "@material-ui/core";
import {InitialValueType} from "./RegistrationContainer";

type PropsType = {
    formik: FormikProps<InitialValueType>
}

export const Registration: React.FC<PropsType> = ({formik}) => {

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
                                    label="Email"
                                    margin="normal"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email &&
                                <div style={{color: 'red'}}>{formik.errors.email}</div>}
                                <TextField
                                    type="password"
                                    label="Password"
                                    margin="normal"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password &&
                                <div style={{color: 'red'}}>{formik.errors.password}</div>}
                                <TextField
                                    type="password"
                                    label="Password2"
                                    margin="normal"
                                    {...formik.getFieldProps('password2')}
                                />
                                {formik.touched.password2 && formik.errors.password2 &&
                                <div style={{color: 'red'}}>{formik.errors.password2}</div>}
                                <div>
                                    <Button type={'reset'} onClick={() => formik.resetForm()} variant={'contained'}
                                            color={'primary'}
                                            style={{marginTop: '70px', borderRadius: '30px'}}>Cancel</Button>
                                    <Button type={'submit'} variant={'contained'} color={'primary'}
                                            style={{
                                                marginTop: '70px',
                                                marginLeft: '100px',
                                                borderRadius: '30px'
                                            }}>Register</Button>
                                </div>

                            </FormGroup>
                        </FormControl>
                    </form>

                </Grid>
            </Paper>
        </Grid>
    );
}

