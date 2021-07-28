import React from 'react';
import './EnterPassword.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {createNewPassThunk} from "../../../n1-main/m2-bll/reducers/auth-reducer";
import {EnterNewPassword} from "./EnterNewPassword";
import {Container} from "@material-ui/core";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {Redirect} from "react-router-dom";


export const EnterNewPasswordContainer = () => {
    const isNewPassword = useSelector<AppRootStateType, boolean>((state) => state.auth.isNewPassword)
    const dispatch = useDispatch()
    const formik = useFormik<InitialValueType>({
        initialValues: {

            password: '',

        },


        validate: (values) => {
            //@ts-ignore
            const errors: FormikErrorType = {};

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length > 11) {
                errors.password = 'The length of password'
            }
            return errors;
        },
        onSubmit: (values) => {


            dispatch(createNewPassThunk(values.password))
            formik.resetForm()
        }
    })

    if (!isNewPassword) {
        return <Redirect to={'/login'}/>
    }
    return (
        <Container style={{maxHeight: '100%'}}>
            <EnterNewPassword formik={formik}/>
        </Container>
    );
}

export type InitialValueType = {
    password: string
}