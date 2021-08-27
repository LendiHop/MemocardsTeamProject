import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import {useFormik} from "formik";
import {Redirect} from "react-router-dom";

import { loginTC } from '../../../../m2-bll/b1-reducers/auth-reducer';
import {Login} from "./Login";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import {RequestStatusType} from "../../../../m2-bll/b1-reducers/app-reduser";

export type FormikLoginInitValues = {
    email: string
    password: string
    rememberMe: boolean
}

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const LoginContainer: React.FC = () => {
    const dispatch = useDispatch();
    const [showPass, setShowPass] = useState(false)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const status = useSelector((state: AppRootStateType): RequestStatusType => state.app.status)
    const handleClickShowPassword = () => {

        const c = !showPass
        setShowPass(c)
    }

    const formik = useFormik({
        initialValues: {
            email: "daniok2021@lendi.com",
            password: "qwezxc123",
            rememberMe: false
        } as FormikLoginInitValues,
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values));
            formik.resetForm();
        },
    })

    if (status === "loading") {
        return <LinearProgress color={"secondary"}/>
    }

    if (isLoggedIn) {
        return <Redirect to={"packs-list"}/>
    }

    return <Login formik={formik} showPass={showPass} handleClickShowPassword={handleClickShowPassword}/>
}