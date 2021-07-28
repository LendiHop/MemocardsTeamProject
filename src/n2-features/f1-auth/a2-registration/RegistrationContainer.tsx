import React from 'react';
import './Registration.module.css';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {onRegisterTC} from '../../../n1-main/m2-bll/reducers/auth-reducer';
import {Redirect} from "react-router-dom";
import {Registration} from "./Registration";
import {Container} from "@material-ui/core";


export const RegistrationContainer: React.FC = () => {

    const isRegistered = useSelector<AppStateType, boolean>(state => state.auth.isRegistered)
    const dispatch = useDispatch()
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
            debugger
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

            <Registration formik={formik}/>

        </Container>
    );
}

export type InitialValueType = {
    email: string
    password: string
    password2: string
}
