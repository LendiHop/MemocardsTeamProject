import React, {useState} from 'react';
import './NewPassword.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {createNewPassThunk} from "../../../../m2-bll/b1-reducers/auth-reducer";
import {NewPassword} from "./NewPassword";
import {Container} from "@material-ui/core";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import {Redirect, useParams} from "react-router-dom";


export const NewPasswordContainer: React.FC = () => {
    const isNewPassword = useSelector<AppRootStateType, boolean>((state) => state.auth.isNewPassword)
    const [showPass, setShowPass] = useState(false)
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>();
    const handleClickShowPassword = () => {

        const c = !showPass
        setShowPass(c)
    }
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
            dispatch(createNewPassThunk(values.password, token))
            formik.resetForm()
        },

    })

    if (!isNewPassword) {
        return <Redirect to={'/login'}/>
    }
    return (
        <Container style={{maxHeight: '100%'}}>
            <NewPassword formik={formik} showPass={showPass} handleClickShowPassword={handleClickShowPassword}/>
        </Container>
    );
}

export type InitialValueType = {
    password: string

}