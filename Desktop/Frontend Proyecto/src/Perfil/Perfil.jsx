import { useState } from "react";

function Perfil({
    usuario,
    email,
    rol,
    cambiarPagina,
    cerrarSesion
}) {

    // Estado para la foto
    const [foto, setFoto] = useState(null);

    // CAMBIAR FOTO
    const cambiarFoto = (e) => {

        const archivo = e.target.files[0];


        if (archivo) {

            const nuevaFoto =
                URL.createObjectURL(
                    archivo
                );

            setFoto(nuevaFoto);

        }

    };

    return (

        <div className="perfil">
                //Boton de inicio

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
// foto de perfil

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


                   //boton para cambiar foto de perfil

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

                </div>
//nombre de usuario

                <div className="dato-perfil">

                    <p>
                        {usuario ||
                            "Nombre Completo"}
                    </p>

                </div>


                //mail de usuario

                <div className="dato-perfil">

                    <p>
                        {email ||
                            "Mail"}
                    </p>

                </div>


                //rol
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