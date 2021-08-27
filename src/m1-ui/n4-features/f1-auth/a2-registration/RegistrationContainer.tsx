import React, {useState} from 'react';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import {onRegisterTC} from '../../../../m2-bll/b1-reducers/auth-reducer';
import {Redirect} from "react-router-dom";
import {Registration} from "./Registration";
import {Container} from "@material-ui/core";


export const RegistrationContainer: React.FC = () => {
    const [showPass1, setShowPass1] = useState(false)
    const [showPass2, setShowPass2] = useState(false)
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.auth.isRegistered)
    const dispatch = useDispatch()
    const handleClickShowPassword1 = () => {

        setShowPass1(!showPass1)
    }
    const handleClickShowPassword2 = () => {

        setShowPass2(!showPass2)
    }
    const formik = useFormik<InitialValueType>({
        initialValues: {
            email: '',
            password: '',
            password2: ''
        } as InitialValueType,


        validate: (values) => {
            //@ts-ignore
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length > 11) {
                errors.password = 'The length of password'
            }
            return errors;
        },
        onSubmit: (values) => {

            if (values.password2 !== values.password) {
                throw new Error('paas2 !== pass')
            }

            dispatch(onRegisterTC(values.email, values.password))
            formik.resetForm()
        }
    })

    if (isRegistered) {
        return <Redirect to={'/login'}/>
    }
    return (
        <Container style={{maxHeight: '100%'}}>

            <Registration formik={formik} showPass1={showPass1} handleClickShowPassword1={handleClickShowPassword1}
                          showPass2={showPass2} handleClickShowPassword2={handleClickShowPassword2}/>

        </Container>
    );
}

export type InitialValueType = {
    email: string
    password: string
    password2: string
}
