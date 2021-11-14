import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, googleProvider } from '../firebase-config';
import {UserContext} from '../components/UserContext'
import { useState } from 'react';



function FormularioLogin() {

  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const [values, setValues] = useState({

    email: '',
    password: '',

  });

  const handleOnChange = (event) => {

    const { value, name: inputName } = event.target;
    console.log({ inputName, value });
    setValues({ ...values, [inputName]: value });

  };

 
  const handleGoogleLogin = async () => {

    await auth.signInWithPopup(googleProvider);
    history.push('/Registrarse');

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    await auth.signInWithEmailAndPassword(values.email, values.password);
    history.push('/');

  };


  return (


    <div className = "App">
      <form onSubmit={handleSubmit}>
        <div className="App">
          <label htmlFor="email">Ingresa tu correo</label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Ingresa tu correo"
            value={values.email}
            onChange={handleOnChange}
          />
        </div>

        <div className= "App">
          <label htmlFor="password">Ingresa tu clave</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Ingresa tu clave"
            value={values.password}
            onChange={handleOnChange}
          />
        </div>

        <button type="submit" onClick={handleSubmit}>
          Enviar
        </button>
      </form>
      <button type="button" onClick={handleGoogleLogin}>
        Entrar con Google
      </button>
    </div>
  );
}

export default FormularioLogin;