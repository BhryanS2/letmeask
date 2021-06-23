import {ButtonHTMLAttributes} from "react"
import '../styles/button.scss'

type propsButtons = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props:propsButtons) {
    return (
        <button className="button" {...props}>

        </button>
    )
}