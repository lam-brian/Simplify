import Button from "../FormElements/Button/Button";
import styles from'./Login.module.css'
import { useState } from "react";
const Reg = () => {
   
const [ index, setindex] = useState(0)

    return (
        <>
        <div className={styles.container}>
        <div className={styles.frame}>
            <button className ={styles.signup} onClick = {()=> {setindex(0)}}>Sign Up</button>
            <button className = {styles.signup} onClick = {()=> {setindex(1)}}>Log In</button >
        </div>
            <div className={styles.line}></div>
       <div hidden = {index !== 0}>
       <form action="">
        <div className ={styles.pas}>Full Name:</div>
        <input type ="name" name = "name" id = "name-signup" className = {styles.input}></input>
        <div className ={styles.pas}>Email:</div>
        <input type ="email" name = "email" id="email-signup"className = {styles.input}></input>
        <div className ={styles.pas}>Password:</div>
        <input type ="password" name = "password" id = "password-signup" className = {styles.input}></input>
        </form>
        <Button className="btn--secondary">Sign up</Button>
        </div>


        <div hidden = {index !==1}>
        <form action="">
        <div className ={styles.pas}>Email:</div>
        <input type ="email" name = "email" id = "email-login" className = {styles.input}></input>
        <div className ={styles.pas}>Password:</div>
        <input type ="password" name = "password" id = "password-login" className = {styles.input}></input>
        </form>
        <Button className="btn--secondary">Log in</Button>
        </div>
        </div>
        </>
    )
}

export default Reg