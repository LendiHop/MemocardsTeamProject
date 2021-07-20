import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import s from './SuperInputText.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    label?: string
}

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        label,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter
        && e.key === 'Enter'
        && onEnter()
    }

    const finalSpanClassName = `${s.error} ${spanClassName && spanClassName}`
    const finalInputClassName = className ? className : s.superInput

    return (
        <>
            <div className={s.group}>
                <input type="text"
                       name={label && label}
                       id={label && label}
                       required
                       onChange={onChangeCallback}
                       onKeyPress={onKeyPressCallback}
                       className={finalInputClassName}
                       {...restProps}
                />
                <span className={s.highlight}></span>
                <span className={s.bar}></span>
                <label htmlFor={label && label} className={s.label}>{label && label}</label>
                {error && <span className={finalSpanClassName}>{error}</span>}
            </div>

        </>
    )
}

export default SuperInputText
