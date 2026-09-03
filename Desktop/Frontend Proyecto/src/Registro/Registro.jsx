import './Registro.css';
import { useState } from "react";

function Registro({


    cambiarPagina,


    agregarUsuario


}) {


    const [nombre, setNombre] = useState("");


    const [email, setEmail] = useState("");


    const [cedula, setCedula] = useState("");


    const [rol, setRol] = useState("");


    const [contraseña, setContraseña] = useState("");


    const [confirmarContraseña, setConfirmarContraseña] =
        useState("");




    function enviarFormulario(e) {


        e.preventDefault();




        // Validaciones


        if (


            !nombre ||


            !email ||


            !cedula ||


            !rol ||


            !contraseña ||


            !confirmarContraseña


        ) {


            alert("Tiene que rellenar todos los campos");


            return;


        }




        // Validar que el nombre tenga solo texto


        if (


            !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)


        ) {


            alert(
                "El nombre solo puede contener texto"
            );


            return;


        }




        // Validar cédula


        if (


            !/^\d{1,8}$/.test(cedula)


        ) {


            alert(
                "La cédula debe contener solo números y un máximo de 8 caracteres"
            );


            return;


        }




        // Validar Gmail


        if (


            !email.endsWith("@gmail.com")


        ) {


            alert(
                "Proporcione un Gmail válido"
            );


            return;


        }




        // Validar contraseña


        const contraseñaValida =


            /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(


                contraseña


            );




        if (!contraseñaValida) {


            alert(


                "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial"


            );


            return;


        }




        // Validar que las contraseñas coincidan


        if (contraseña !== confirmarContraseña) {


            alert("Las contraseñas no coinciden");


            return;


        }




        // Guardar usuario


        agregarUsuario({


            id: Date.now(),


            nombre,


            email,


            cedula,


            rol,


            contraseña


        });




        alert(
            "Usuario registrado correctamente."
        );




        // Limpiar formulario


        setNombre("");


        setEmail("");


        setCedula("");


        setRol("");


        setContraseña("");


        setConfirmarContraseña("");




        // Volver a inicio de sesión


        cambiarPagina("login");


    }




    return (


        <div>


            <h2>Registro de Usuario</h2>




            <form onSubmit={enviarFormulario}>




                <div>


                    <label>Nombre</label>


                    <br />


                    <input


                        type="text"


                        value={nombre}


                        onChange={(e) =>


                            setNombre(e.target.value)


                        }


                    />


                </div>




                <br />




                <div>


                    <label>Cédula</label>


                    <br />


                    <input


                        type="text"


                        maxLength="8"


                        value={cedula}


                        onChange={(e) =>


                            setCedula(e.target.value)


                        }


                    />


                </div>




                <br />




                <div>


                    <label>Gmail</label>


                    <br />


                    <input


                        type="email"


                        value={email}


                        onChange={(e) =>


                            setEmail(e.target.value)


                        }


                    />


                </div>




                <br />




                <div>


                    <label>Curso</label>


                    <br />


                    <select


                        value={rol}


                        onChange={(e) =>


                            setRol(e.target.value)


                        }


                    >


                        <option value="">


                            Seleccionar


                        </option>


                        <option value="TIC">


                            TIC


                        </option>


                        <option value="ADM">


                            ADM


                        </option>


                    </select>


                </div>




                <br />




                <div>


                    <label>Contraseña</label>


                    <br />


                    <input


                        type="password"


                        value={contraseña}


                        onChange={(e) =>


                            setContraseña(e.target.value)


                        }


                    />


                </div>




                <br />




                <div>


                    <label>Confirmar Contraseña</label>


                    <br />


                    <input


                        type="password"


                        value={confirmarContraseña}


                        onChange={(e) =>


                            setConfirmarContraseña(


                                e.target.value


                            )


                        }


                    />


                </div>




                <br />




                <button id='' type="submit">


                    Registrarse


                </button>


            </form>




            <br />




            <button id="boton-cancelar"


                type="button"

                onClick={() =>

                    cambiarPagina("login")

                }


            >


                Volver al inicio de sesión


            </button>


        </div>


    );


}


export default Registro;