import axios from "axios";
import { useEffect, useState } from "react"  
import './login.css';
import { validateLogin } from "../utils/appValidateLogin";
import { toast } from "react-toastify";
import { Navigate } from 'react-router-dom'
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { api_url } from "../configApi/Request";


export default function Login() {

    // state qui stock champs email formulaire
    const [email, setEmail] = useState('');

    // Récupération du csrf token (croos-site requerest forgery) 
    const [csrfToken, setCsrfToken] = useState('')
    
    // state qui stock qui intercepte erreur champs email formulaire
    const [errEmail, setErrEmail] = useState('');

    // state qui stock champs password formulaire
    const [password, setPassword] = useState('');

    // state qui stock qui intercepte erreur champs password formulaire
    const [errPassword, setErrPassword] = useState('');

    // state  redirect défini à false
    const [redirect, setRedirect] = useState(false)

    // state  passwordVisible défini à false
    const [passwordVisible, setPasswordVisible] = useState('password');


    // fonction qui va récupérer le csrfToekn généré coté back
    useEffect(() => {
        // Récupération du jeton CSRF depuis le serveur
        axios.get(`${api_url}/csrf-token`)
        .then(res => {
            console.log("🚀 ~ useEffect ~ res:", res)
            console.log("🚀 ~ useEffect ~ res:", res.data.csrfToken)
            setCsrfToken(res.data.csrfToken);
        })
        .catch(error => {
            console.log(`Erreur while take  the csrf token : ${error}`)
            
        })
    } , []);
    
    console.log("🚀 ~ Login ~ csrfToken:", csrfToken)

    // fonction qui change le state passwordVisible à visble au clique sur le bouton
    // du champs password du formulaire pour afficher/masquer le mot de passe
    function togglePassword(e) {
        e.preventDefault();
        if (passwordVisible === "password") {
            setPasswordVisible("text")
        } else {
            setPasswordVisible("password")
        }
    }

    // fonction qui se déclenche au changement d'état de input email
    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    // fonction qui se déclenche au changement d'état de input password
    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    // fonction qui se déclenche à l'appel de la fonction
    // handleSubmit si il n y a pas d'erreur dans canSubmit on peut
    // lancer la requête POST pour connecter l'utilisateur
    function canSubmit() {
        const { success, errors } = validateLogin({
            email,
            password
        })
        // console.log("sucess :", success, "errors:", errors);

        setErrEmail(errors.email);
        setErrPassword(errors.password);

        return success;
    }




    // Quand le boutton submit du formulaire est cliqué
    // la fonction vérifie si le formulaire contient des errurs ou non
    function handleSubmit(e) {
        e.preventDefault();
        // si 
        if (!canSubmit()) {
            return
        }
        let body = {
            email,
            password
        }

        // console.log(body);
        axios.post(`${api_url}/api/users/login`, body, {
            headers: {
                'x-csrf-token': csrfToken
            }
        })
            .then((response) => {

                console.log(response.data.msg);


                const array = {
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    role: response.data.role,
                    token: response.data.token
                }
                // si tout se passe bien enregistrement du token dans e localstorage
                localStorage.setItem("user", JSON.stringify(array))
                sessionStorage.setItem("user", JSON.stringify(array))

                // on redirige vers l'acceuil
                setRedirect(true)


                if (response.status === 200) {
                    toast.success(response.data.msg, { type: "success", theme: "colored", autoClose: 5000 });

                } else {

                    toast.error(response.data.msg, { type: "error", theme: "colored", autoClose: 5000 });
                }



            })
            .catch(err => { toast.error(err.message, { type: "info", theme: "colored", autoClose: 5000 }); });
        //console.log(redirect);





    }
    console.log(redirect);


    if (redirect) {
        //console.log('redirect');
        return <Navigate to="/acceuil" />
    }


    return (
        <div>
            <h1 className="bg-dark text-white">
                LOGIN
            </h1>

            <form className="form">
                <label htmlFor="email" style={{ color: "black" }}><strong>Entry your email :</strong></label>
                <input type='email' id="email" name="email" value={email} onChange={handleChangeEmail} required />
                {errEmail && <p>{errEmail}</p>}
                <label htmlFor="password" style={{ color: "black" }}><strong>Entry your password :</strong></label>
                <div className="input-group">
                    <input className="form-control " id="password" name="password" type={passwordVisible} value={password} onChange={handleChangePassword} required />
                    {errPassword && <p>{errPassword}</p>}
                    <div className="btn-group">
                        <button className="btn btn-primary p-2" onClick={togglePassword}>
                            {passwordVisible === "password" ? <BsEyeSlash style={{ color: "black" }} /> : <BsEye style={{ color: "black" }} />}
                        </button>
                    </div>
                </div>
                <button className="submit-form" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}
