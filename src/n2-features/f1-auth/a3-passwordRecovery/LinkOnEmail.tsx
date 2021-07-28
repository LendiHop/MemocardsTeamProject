import React from 'react'
import {Link, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";


export const LinkOnEmail: React.FC = () => {

    const email = useSelector<AppRootStateType, string>((state => state.auth.email))

    return (
        <Typography>

            <Link href="#/set-new-password" variant="body2">
               {`Goto email : ${email}`}
            </Link>

        </Typography>

    )
}
