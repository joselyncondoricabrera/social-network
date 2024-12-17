import '../styles/SignIn.css';
import { useAuth } from '../context/AuthContext';
import { getUserData, saveUserData } from '../firebase/firebase_utils';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const SignIn = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleSingInWithEmailPassword = (event) => {
        event.preventDefault();

        console.log({email, password});
        auth.loginWithEmailPassword( email, password )
        .then((result) => {
            console.log(result);
            navigate('/home');
        })
        .catch((error) => {
            console.log(error.code);
            if( error.code === 'auth/invalid-credential'){
                alert('Error: credenciales inválidos');
            } else if(error.code === 'auth/invalid-email'){
                alert('Error: email incorrecto');
            }
            
        })
        
    }

    const handleSingInGoogle = () => {
        auth.loginWithGoogle()
        .then((res) => {
            const { uid, displayName, email } = res.user;

            getUserData( uid )
            .then((doc) => {
                if(doc.exists()){
                    console.log('uid existe');
                    navigate('/home');                  
                }else{
                    console.log('uid no existe, guardar contacto');
                    saveUserData( uid, displayName, email ); 
                    navigate('/home');
                }
            });    
        })
        .catch((error) => {
            console.log(error);
            alert(error);
        });
    }


    return (
        <>
                <div className='login-container'>
                    <img className="background-login-desktop" src="../src/assets/loginDesktop.png" />
                    <section className='login-section'>
                        <h1>Iniciar sesión</h1>
                        <p>Bienvenidos, gracias por visitarnos nuevamente.</p>
                        <form className="form" onSubmit={ handleSingInWithEmailPassword }>
                            <div className="form-input">
                                <img src="../src/assets/user.png" />
                                <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value) } required />
                            </div>
                            {/* <span className="form-alert correct-mail">El email es válido</span>
                        <span className="form-alert incorrect-mail">El email no es válido</span> */}
                            <div className="form-input">
                                <img src="../src/assets/key2.png" />
                                <input type="password" placeholder="contraseña"  onChange={(e) => setPassword(e.target.value) } required />
                            </div>
                            {/* <span className="form-alert correct-password">La contraseña es válida</span>
                        <span className="form-alert incorrect-password">La contraseña debe contener al menos 4 caracteres y como máximo 12</span> */}
                            <div className="form-final-options">
                                <button type="submit">Iniciar sesión</button>
                                <Link to={'/signUp'}>no tienes cuenta?</Link>
                            </div>
                        </form>
                        <div className="container-authentication">
                            <p>o ingresa con</p>
                            <button className="button-authentication" onClick={ handleSingInGoogle }>
                                <img src="../src/assets/gDL.png" />
                            </button>
                        </div>
                    </section>

                </div>
        </>
    )
}
