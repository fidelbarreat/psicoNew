import React from "react";
import { auth, db } from "../firebase-config";
import { useHistory } from 'react-router-dom';
import { useState} from "react";




function FormularioPerfilPaciente(){

    


        
    


    const history = useHistory();

    
    const [values , setValues] = useState({

        email : "",
        password : "",
        nombre:"",
        fecha_de_nacimiento: "",
        telefono:"",
        tipo_de_usuario:"",
        file: ""

    });


    const handleOnChange = (e) => {

        const {value , name:inputName} = e.target;
        setValues({...values , [inputName]:value})

    }

    
    const handleSubmit = async (e) =>{

        e.preventDefault();
        const response = await auth.createUserWithEmailAndPassword(
            values.email , 
            values.password
            
        );


        console.log(values);

        try {

            db.collection("users").doc(response.user.uid).set(values).catch((err) => {

                console.log(err);
               
    
            });
            
        } catch (error) {

            console.log(error.message);
            
        }


        history.push('/Perfil');

    }



    return (


        <div className = "App">

        <form onSubmit = {handleSubmit}>

            <div className = "App">
                <label htmlFor = "email">Email : </label>
                <input type="email" id = "email" placeholder = {} name = "email" value = {values.email} onChange = {handleOnChange}></input>
                <button onClick={handleSubmit}>Modificar</button>
            </div>

            <div className = "App">
                <label htmlFor = "clave">Password : </label>
                <input type="password" id = "password" placeholder="Ingrese su password" name = "password" value = {values.password} onChange = {handleOnChange}></input>
                <button onClick={handleSubmit}>Modificar</button>
            </div>

        </form>

        
    </div>

    )

}



export default FormularioPerfilPaciente;