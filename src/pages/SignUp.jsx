import { Link } from "react-router-dom";
import '../styles/SignUp.css';
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { saveUserData } from "../firebase/firebase_utils";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = (event)=> {
    event.preventDefault();

    auth.registerUserWithEmailPassword( email, password )
    .then((result) => {
      saveUserData(result.user.uid, userName, email);
      navigate('/');

    })
    .catch((error) => {

      console.log(error.code);
      if(error.code === 'auth/email-already-in-use'){
        alert('Error: Este correo electrónico ya está registrado.');
      }
      else if(error.code === 'auth/weak-password'){
        alert('Error: contraseña debil')
      }
    });
    
  }

  return (
    <>
      <div className="signup-container">
        <img className="background-signup-desktop" src="../src/assets/loginDesktop.png" />
        <section className="signup-section">
          <h1>Crear cuenta</h1>
          <p>Por favor llene los datos antes de continuar.</p>
          <form className="form" onSubmit={ handleCreateAccount }>
            <div className="form-input" >
              <img src="../src/assets/user.png" />
              <input name="username" type="text" placeholder="nombre de usuario" onChange={(e)=> setUserName(e.target.value)} required />
            </div>
            {/* <span class="form-alert correct-username">El nombre de usurio es válido</span>
          <span class="form-alert incorrect-username ">El nombre de usurio no es válido</span> */}

            <div className="form-input">
              <img src="./src/assets/email.png" />
              <input type="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)} required />
            </div>
            {/* <span class="form-alert correct-mail">El email es válido</span>
          <span class="form-alert incorrect-mail">El email no es válido</span> */}

            <div className="form-input">
              <img src="../src/assets/key.png" />
              <input name="password" type="password" placeholder="contraseña" onChange={(e)=> setPassword(e.target.value)} required />
            </div>
            {/* <span class="form-alert correct-password">La contraseña es válida</span>
          <span class="form-alert incorrect-password">La contraseña debe contener al menos 4 caracteres y como máximo 12</span> */}

            <div className="form-final-options">
              <button type="submit">Crear cuenta</button>
              <Link to="/" >tienes cuenta?</Link>
            </div>
          </form>
        </section>

      </div>
    </>
  )
}
