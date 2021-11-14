import React from "react";
import { useState} from "react";
import { auth, db , st } from "../firebase-config";
import { useHistory } from 'react-router-dom';



function FormularioRegistro(){

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

    const handleOnFile = async (e) =>{

        try {

          
            const archivolocal = e.target.files[0];
            console.log(archivolocal);
            const currRef = st.ref().child(`curriculums/${archivolocal.name}`);
            await currRef.put(archivolocal);
            const urlFile = await currRef.getDownloadURL();
            setValues( {...values, file: urlFile} );

        } catch (error) {

            console.log(error.message);
            
        }
        
    }


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


        history.push('/');

    }

    


    return(

        <>

        <div className = "App">

            <form onSubmit = {handleSubmit}>

                <div className = "App">
                    <label htmlFor = "email">Ingrese su Email</label>
                    <input type="email" id = "email" placeholder="Ingrese su correo" name = "email" value = {values.email} onChange = {handleOnChange}></input>
                </div>

                <div className = "App">
                    <label htmlFor = "clave">Ingrese su password</label>
                    <input type="password" id = "password" placeholder="Ingrese su password" name = "password" value = {values.password} onChange = {handleOnChange}></input>
                </div>

                <div className = "App">
                    <label htmlFor = "nombre">Ingrese su nombre</label>
                    <input type="text" id = "nombre" placeholder="Ingrese su nombre" name = "nombre" value = {values.nombre} onChange = {handleOnChange}></input>
                </div>


                <div className = "App">
                    <label htmlFor = "fecha_de_nacimiento">Ingrese su fecha_de_nacimiento</label>
                    <input type="date" id = "fecha_de_nacimiento" placeholder="Ingrese su fecha de nacimiento" name = "fecha_de_nacimiento" value = {values.fecha_de_nacimiento} onChange = {handleOnChange}></input>
                </div>



                <div className = "App">
                    <label htmlFor = "telefono">Ingrese su telefono</label>
                    <input type="number" id = "telefono" placeholder="Ingrese su telefono" name = "telefono" value = {values.telefono} onChange = {handleOnChange}></input>
                </div>


                <div className = "App">

                    <label htmlFor = "tipo_de_usuario"></label>

                    <input type="radio" id ="especialista" name ="tipo_de_usuario" value = "Especialista" onChange = {handleOnChange}/>
                    <label for = "especialista">Especialista</label>

                    <input type="radio" id ="paciente" name ="tipo_de_usuario" value = "Paciente" onChange = {handleOnChange}/>
                    <label for = "paciente">Paciente</label>
            
                </div>

                <div className = {`App ${values?.tipo_de_usuario !== "Especialista"? "invisible" : "visible" }`} >

                    <label htmlFor="file">Ingrese sus credenciales</label>
                    <br />
                    <input type="file"  id = "file" accept = ".pdf" name = "file"  onChange = {handleOnFile}></input>
                    
                </div>


                <button onClick={handleSubmit} >Crear Cuenta</button>


            </form>

            
        </div>
        
        </>

    )

};

export default FormularioRegistro;