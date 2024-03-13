import Link from "next/link";
import classes from './button.module.css'

export default function Button(props) {

    if (props.link) {
        return <Link className={classes.btn} href={props.link} >
            {props.children}
        </Link>
    }

    return  <button className={classes.btn} onClick={props.OnClick} > {props.children} </button>

}