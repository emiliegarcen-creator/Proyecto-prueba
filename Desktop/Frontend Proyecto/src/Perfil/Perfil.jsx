import { useState } from "react";
import './Perfil.css';

function Perfil({


    usuario,


    email,


    rol,


    cambiarPagina,


    cerrarSesion


}) {




    // Estado para la foto


    const [foto, setFoto] = useState(null);


    const [fotoTemporal, setFotoTemporal] =
        useState(null);




    // CAMBIAR FOTO


    const cambiarFoto = (e) => {


        const archivo = e.target.files[0];




        if (archivo) {




            // Validar que sea una imagen


            if (


                !archivo.type.startsWith("image/")


            ) {


                alert(


                    "Seleccione una imagen válida."


                );


                return;


            }




            const nuevaFoto =


                URL.createObjectURL(


                    archivo


                );




            setFotoTemporal(nuevaFoto);


        }


    };




    // SUBIR FOTO


    const subirFoto = () => {


        if (!fotoTemporal) {


            alert(


                "Seleccione una foto primero."


            );


            return;


        }




        setFoto(fotoTemporal);


        alert(


            "Foto de perfil actualizada."


        );


    };




    return (


        <div className="perfil">




            {/* Boton de inicio */}


            <button


                type="button"


                onClick={() =>


                    cambiarPagina(


                        "inicio"


                    )


                }


            >


                Casita


            </button>




            <main>




                {/* Foto de perfil */}


                <div className="foto-perfil">


                    {foto ? (


                        <img


                            src={foto}


                            alt="Foto de perfil"


                        />


                    ) : (


                        <span>


                            Foto de perfil


                        </span>


                    )}




                    {/* Boton para cambiar foto de perfil */}


                    <label>


                        Camarita


                        <input


                            type="file"


                            accept="image/*"


                            onChange={


                                cambiarFoto


                            }


                            hidden


                        />


                    </label>




                    {fotoTemporal && (


                        <button


                            type="button"


                            onClick={subirFoto}


                        >


                            Subir


                        </button>


                    )}


                </div>




                {/* Nombre de usuario */}


                <div className="dato-perfil">


                    <p>


                        {usuario ||


                            "Nombre Completo"}


                    </p>


                </div>




                {/* Mail de usuario */}


                <div className="dato-perfil">


                    <p>


                        {email ||


                            "Mail"}


                    </p>


                </div>




                {/* Rol */}


                <div className="dato-perfil">


                    <p>


                        {rol ||


                            "Rol"}


                    </p>


                </div>




                <button


                    type="button"


                    onClick={


                        cerrarSesion


                    }


                >


                    Cerrar sesión


                </button>




            </main>


        </div>


    );


}


export default Perfil;