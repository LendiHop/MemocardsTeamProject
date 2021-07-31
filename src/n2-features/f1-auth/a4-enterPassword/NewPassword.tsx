import React from 'react';
import {FormikProps} from 'formik';
import {Button, FormControl, FormGroup, FormLabel, Grid, Paper, TextField} from "@material-ui/core";
import {InitialValueType} from "./NewPasswordContainer";

type PropsType = {
    formik: FormikProps<InitialValueType>
}

export const NewPassword: React.FC<PropsType> = ({formik}) => {

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

