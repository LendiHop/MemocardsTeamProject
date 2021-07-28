import React from 'react';
import './EnterPassword.module.css';
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {createNewPassThunk, onRegisterTC} from "../../../n1-main/m2-bll/reducers/auth-reducer";
import {EnterNewPassword} from "./EnterNewPassword";


export const EnterNewPasswordContainer = () => {

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

    return (
    <div className="EnterPassword">
        <EnterNewPassword formik={formik} />
    </div>
  );
}

export type InitialValueType = {
    password: string
}