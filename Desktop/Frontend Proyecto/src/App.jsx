import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Registro from "./Registro/Registro";
import InicioSesion from "./Inicio de sesión/iniciodesesion";
import PaginaInicialCliente from "./Paginainicialcliente/paginainicialcliente";
import CrearTicket from "./Crear ticket/CrearTicket";
import TicketMantenimiento from "./Ticket Mantenimiento/TicketMantenimiento";
import Perfil from "./Perfil/Perfil";

// Componente para actualizar el título de la página automáticamente según la ruta activa
function TituloPagina() {
    const location = useLocation();

useEffect(() => {

        console.log("PÁGINA ACTUAL:", location.pathname);

        if (location.pathname === "/" || location.pathname === "/login") {
            document.title = "Iniciar sesión";

        } else if (location.pathname === "/registro") {
            document.title = "Registro";

        } else if (location.pathname === "/inicio") {
            document.title = "Página principal";

        } else if (location.pathname === "/crear-ticket") {
            document.title = "Crear ticket";

        } else if (location.pathname === "/mantenimiento") {
            document.title = "Ticket de mantenimiento";

        } else if (location.pathname === "/perfil") {
            document.title = "Perfil";

        }

    }, [location]);

    return null;

}

function AppContenido() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState("");
    const [tickets, setTickets] = useState([]);
    const [usuariosRegistrados, setUsuariosRegistrados] = useState([]);

    // Cambiar de página utilizando React Router Dom
    const cambiarPagina = (nuevaPagina) => {
        console.log("CAMBIANDO PÁGINA A:", nuevaPagina);

        switch (nuevaPagina) {
            case "login":
                navigate("/login");
                break;
            case "registro":
                navigate("/registro");
                break;
            case "inicio":
                navigate("/inicio");
                break;
            case "crear-ticket":
                navigate("/crear-ticket");
                break;
            case "mantenimiento":
                navigate("/mantenimiento");
                break;
            case "perfil":
                navigate("/perfil");
                break;
            default:
                navigate(`/${nuevaPagina}`);
                break;
        }
    };

    // Agregar ticket
    const agregarTicket = (nuevoTicket) => {
        setTickets((ticketsActuales) => [
            ...ticketsActuales,
            nuevoTicket
        ]);
    };

    // Eliminar ticket
    const eliminarTicket = (id) => {
        setTickets((ticketsActuales) =>
            ticketsActuales.filter(
                (ticket) => ticket.id !== id
            )
        );
    };

    // Agregar usuario registrado
    const agregarUsuario = (nuevoUsuario) => {
        setUsuariosRegistrados((usuariosActuales) => [
            ...usuariosActuales,
            nuevoUsuario
        ]);
    };

    // Iniciar sesión
    const iniciarSesion = (nombreUsuario, password) => {
        const usuarioEncontrado = usuariosRegistrados.find(
            (usuarioRegistrado) =>
                usuarioRegistrado.nombre === nombreUsuario &&
                usuarioRegistrado.contraseña === password
        );

        if (!usuarioEncontrado) {
            alert(
                "Datos invalidos, por favor intente nuevamente"
            );
            return;
        }

        // Guardar datos del usuario
        setUsuario(usuarioEncontrado.nombre);
        setEmail(usuarioEncontrado.email);
        setRol(usuarioEncontrado.rol);

        // Ir a página principal
        cambiarPagina("inicio");
    };

    // Cerrar sesión
    const cerrarSesion = () => {
        setUsuario("");
        setEmail("");
        setRol("");
        cambiarPagina("login");
    };

    return (
        <div>
            <TituloPagina />
            <Routes>
                <Route
                    path="/"
                    element={
                        <InicioSesion
                            iniciarSesion={iniciarSesion}
                            cambiarPagina={cambiarPagina}
                        />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <InicioSesion
                            iniciarSesion={iniciarSesion}
                            cambiarPagina={cambiarPagina}
                        />
                    }
                />
                <Route
                    path="/registro"
                    element={
                        <Registro
                            agregarUsuario={agregarUsuario}
                            cambiarPagina={cambiarPagina}
                        />
                    }
                />
                <Route
                    path="/inicio"
                    element={
                        <PaginaInicialCliente
                            usuario={usuario}
                            tickets={tickets}
                            eliminarTicket={eliminarTicket}
                            cambiarPagina={cambiarPagina}
                        />
                    }
                />
                <Route
                    path="/crear-ticket"
                    element={
                        <CrearTicket
                            agregarTicket={agregarTicket}
                            cambiarPagina={cambiarPagina}
                        />
                    }
                />
                <Route
                    path="/mantenimiento"
                    element={
                        <TicketMantenimiento
                            agregarTicket={agregarTicket}
                            cambiarPagina={cambiarPagina}
                        />
                    }
                />
                <Route
                    path="/perfil"
                    element={
                        <Perfil
                            usuario={usuario}
                            email={email}
                            rol={rol}
                            cambiarPagina={cambiarPagina}
                            cerrarSesion={cerrarSesion}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContenido />
        </BrowserRouter>
    );
}

export default App;