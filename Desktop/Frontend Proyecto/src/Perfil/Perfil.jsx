import { useState } from "react";
import "./perfil.css";

function Perfil({
    usuario,
    email,
    rol,
    cambiarPagina,
    cerrarSesion
}) {

    const [foto, setFoto] = useState(null);

    const cambiarFoto = (e) => {

        const archivo = e.target.files[0];

        if (archivo) {
            const nuevaFoto =
                URL.createObjectURL(archivo);

            setFoto(nuevaFoto);
        }
    };

    return (

        <div className="perfil">

            {/* Botón de inicio */}

            <button
                type="button"
                className="boton-inicio"
                onClick={() => cambiarPagina("inicio")}
            >
                🏠
            </button>

            <main className="perfil-contenido">

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

                    <label className="boton-camara">

                        📷

                        <input
                            type="file"
                            accept="image/*"
                            onChange={cambiarFoto}
                            hidden
                        />

                    </label>

                </div>

                {/* Nombre */}

                <div className="dato-perfil">
                    <p>
                        {usuario || "Nombre Completo"}
                    </p>
                </div>

                {/* Mail */}

                <div className="dato-perfil">
                    <p>
                        {email || "Mail"}
                    </p>
                </div>

                {/* Rol */}

                <div className="dato-perfil">
                    <p>
                        {rol || "Rol"}
                    </p>
                </div>

                {/* Cerrar sesión */}

                <button
                    type="button"
                    className="cerrar-sesion"
                    onClick={cerrarSesion}
                >
                    Cerrar sesión
                </button>

            </main>

        </div>
    );
}

export default Perfil;