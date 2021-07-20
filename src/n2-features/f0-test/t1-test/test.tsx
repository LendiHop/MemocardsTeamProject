import React, {ChangeEvent, useState} from 'react'
import SuperInputText from './common/c1-SuperInputText/SuperInputText'
import s from './test.module.css'
import SuperButton from './common/c2-SuperButton/SuperButton'
import SuperCheckbox from './common/c3-SuperCheckbox/SuperCheckbox'

export const Test = () => {
    const [text, setText] = useState<string>('')
    const error = text ? '' : 'Error description'

    const showAlert = () => {
        if (error) {
            alert('Enter text...')
        } else {
            alert(text)
        }
    }

    const [checked, setChecked] = useState<boolean>(false)
    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    return (
        <div>
            <div className={s.column}>
                <SuperInputText
                    value={text}
                    onChangeText={setText}
                    onEnter={showAlert}
                    error={error}
                    label="Name"
                />

                <SuperInputText
                    value={text}
                    onChangeText={setText}
                    onEnter={showAlert}
                    label="Email"
                />

                <SuperButton>
                    default
                </SuperButton>

                <SuperButton
                    red
                    onClick={showAlert}
                >
                    delete
                </SuperButton>

                <SuperButton disabled>
                    disabled
                </SuperButton>

                <SuperCheckbox
                    checked={checked}
                    onChangeChecked={setChecked}
                >
                    some text
                </SuperCheckbox>

                <SuperCheckbox checked={checked} onChange={testOnChange}> </SuperCheckbox>
            </div>
        </div>
    )
}
