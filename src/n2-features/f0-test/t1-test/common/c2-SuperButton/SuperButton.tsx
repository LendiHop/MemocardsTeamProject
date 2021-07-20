import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className, children,
        ...restProps
    }
) => {
    const finalClassName = `${red ? s.red + " " + s.btn : s.btn} ${className}`

    return (
        <button className={finalClassName} {...restProps}>
            <span>{children}</span>
        </button>
    )
}

export default SuperButton
