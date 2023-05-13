import { Email } from "@material-ui/icons";
import axios from "axios";
import { useState } from "react"
import './register.css'
import { validateRegister } from "../utils/appValidateRegister";
import { toast } from "react-toastify";
import { Navigate } from 'react-router-dom'
import { api_url } from "../configApi/Request";



export default function Register() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errFirstName, setErrFirstName] = useState('');
    const [errLastName, setErrLastName] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const [redirect, setRedirect] = useState(false)





    function handleChangeFirstName(e) {
        setFirstName(e.target.value)
    }

    function handleChangeLastName(e) {
        setLastName(e.target.value)
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }


    function canSubmit() {
        const { success, errors } = validateRegister({
            firstName,
            lastName,
            email,
            password
        })
        // console.log("sucess :", success, "errors:", errors);

        setErrFirstName(errors.firstName);
        setErrLastName(errors.lastName);
        setErrEmail(errors.email);
        setErrPassword(errors.password);


        return success;

    }




    function handleSubmit(e) {
        e.preventDefault()
        if (!canSubmit()) {
            return
        }
        let body = {
            firstName,
            lastName,
            email,
            password
        }
        //console.log(body);
        axios.post(`${api_url}/api/v1/user`, body)
            .then((response) => {

                console.log(response);
                // on redirige vers l'acceuil
                setRedirect(true)


                if (response.status === 201) {
                    console.log(response.data.msg);
                    toast.success(response.data.msg, { type: "warning", theme: "colored", autoClose: 5000 });

                } else {

                    toast.error(response.data.msg, { type: "error", theme: "colored", autoClose: 5000 });


                }


            })
            .catch(err => { toast.error(err.message, { type: "info", theme: "colored", autoClose: 5000 }); });

    }

    if (redirect) {
        //console.log('redirect');
        return <Navigate to="/login" />
    }



    return (
        <div>
            <h1 className="bg-white text-dark">
                REGISTER
            </h1>

            <form className="form">
                <label htmlFor="firstname" style={{color: "black"}}><strong>Entry your firstName :</strong></label>
                <input value={firstName} onChange={handleChangeFirstName} id="firstname" name="firstname" required />
                {errFirstName && <p>{errFirstName}</p>}
                <label htmlFor="lastname" style={{color: "black"}}><strong>Entry your lastName :</strong></label>
                <input value={lastName} onChange={handleChangeLastName} id="lastname" name="lastname" required />
                {errLastName && <p>{errLastName}</p>}
                <label htmlFor="email" style={{color: "black"}}><strong>Entry your email :</strong></label>
                <input type='email' value={email} onChange={handleChangeEmail} id="email" name="email" required />
                {errEmail && <p>{errEmail}</p>}
                <label htmlFor="password" style={{color: "black"}}><strong>Entry your password :</strong></label>
                <input type='password' value={password} onChange={handleChangePassword} id="password" name="password" required />
                {errPassword && <p>{errPassword}</p>}

                <button className="submit-form" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}