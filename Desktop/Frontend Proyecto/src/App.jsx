import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Registro from "./Pagina de Cliente/Registro/Registro";
import InicioSesion from "./Pagina de Cliente/Inicio de sesión/iniciodesesion";
import PaginaInicialCliente from "./Pagina de Cliente/Pagina inicial/paginainicialcliente";
import CrearTicket from "./Pagina de Cliente/Crear ticket/CrearTicket";
import TicketMantenimiento from "./Pagina de Cliente/Ticket Mantenimiento/TicketMantenimiento";
import Perfil from "./Pagina de Cliente/Perfil/Perfil";
import Calendario from "./Pagina de Cliente/CalendarioCliente/CalendarioCliente";
import Sidebar from "./Pagina de Cliente/Sidebar/Sidebar";
import Topbar from "./Pagina de Cliente/Topbar/Topbar";
import PaginaInicialSoporte from "./Pagina de Soporte/Pagina Inicial Soporte/PaginaInicialSoporte";
import HistorialSoporte from "./Pagina de Soporte/Historial/HistorialSoporte";

// AJUSTA ESTE VALOR a como guardas el rol de soporte en el registro
const ROL_SOPORTE = "soporte";

// Componente para actualizar el título de la página automáticamente según la ruta activa
function TituloPagina() {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/" || location.pathname === "/PaginaInicialSoporte") {
            document.title = "Iniciar sesión";
        } else if (location.pathname === "/registro") {
            document.title = "Registro";
        } else if (location.pathname === "/inicio") {
            document.title = "Página principal";
        } else if (location.pathname === "/soporte") {
            document.title = "Página principal de soporte";
        } else if (location.pathname === "/historial") {
            document.title = "Historial de tickets";
        } else if (location.pathname === "/calendario") {
            document.title = "Calendario";
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

function useLocalStorage(clave, valorInicial) {
    const [valor, setValor] = useState(() => {
        try {
            const guardado = localStorage.getItem(clave);
            return guardado ? JSON.parse(guardado) : valorInicial;
        } catch {
            return valorInicial;
        }
    });

    // Guardar cada vez que cambia
    useEffect(() => {
        try {
            localStorage.setItem(clave, JSON.stringify(valor));
        } catch (error) {
            console.error("No se pudo guardar", clave, error);
        }
    }, [clave, valor]);

    // Sincronizar con otras pestañas
    useEffect(() => {
        const alCambiar = (e) => {
            if (e.key === clave && e.newValue) {
                setValor(JSON.parse(e.newValue));
            }
        };
        window.addEventListener("storage", alCambiar);
        return () => window.removeEventListener("storage", alCambiar);
    }, [clave]);

    return [valor, setValor];
}

function AppContenido() {
    
    const navigate = useNavigate();
    const location = useLocation();
    const [fotoPerfil, setFotoPerfil] = useState("");

    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState("");
    const [tickets, setTickets] = useLocalStorage("tickets", []);
const [historial, setHistorial] = useLocalStorage("historial", []);
const [usuariosRegistrados, setUsuariosRegistrados] = useLocalStorage("usuarios", []);

    const esSoporte = rol === ROL_SOPORTE;

    // El sidebar no se muestra en login ni registro
    const rutasSinSidebar = ["/", "/login", "/registro"];
    const mostrarSidebar = !rutasSinSidebar.includes(location.pathname);

    // Cambiar de página utilizando React Router Dom
    const cambiarPagina = (nuevaPagina) => {
        switch (nuevaPagina) {
            case "login":
                navigate("/login");
                break;
            case "registro":
                navigate("/registro");
                break;
            case "inicio":
                // Soporte tiene su propia página principal
                navigate(esSoporte ? "/soporte" : "/inicio");
                break;
            case "soporte":
                navigate("/soporte");
                break;
            case "historial":
                navigate("/historial");
                break;
            case "calendario":
                navigate("/calendario");
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

    // Agregar ticket: completa los datos que necesita soporte
    const agregarTicket = (nuevoTicket) => {
        const ticketCompleto = {
            ...nuevoTicket,
            dueño: usuario,
            fecha: new Date().toISOString().slice(0, 10), // formato 2026-10-29
            prioridad: "Media"
        };

        setTickets((ticketsActuales) => [
            ...ticketsActuales,
            ticketCompleto
        ]);
    };

    // Actualizar ticket (lo usa soporte para tomar, priorizar y cerrar)
    const actualizarTicket = (ticketActualizado) => {
        setTickets((ticketsActuales) =>
            ticketsActuales.map((ticket) =>
                ticket.id === ticketActualizado.id
                    ? ticketActualizado
                    : ticket
            )
        );
    };

    // Registrar el cierre de un ticket en el historial
    const registrarHistorial = (registro) => {
        setHistorial((historialActual) => [
            ...historialActual,
            registro
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
            alert("Datos invalidos, por favor intente nuevamente");
            return;
        }

        // Guardar datos del usuario
        setUsuario(usuarioEncontrado.nombre);
        setEmail(usuarioEncontrado.email);
        setRol(usuarioEncontrado.rol);

        // Ir a la página principal según el rol
        navigate(usuarioEncontrado.rol === ROL_SOPORTE ? "/soporte" : "/inicio");
    };

    // Cerrar sesión
    const cerrarSesion = () => {
        setUsuario("");
        setEmail("");
        setFotoPerfil("");
        setRol("");
        cambiarPagina("login");
    };

    return (
        <div>
            <TituloPagina />

            {mostrarSidebar && <Sidebar cambiarPagina={cambiarPagina} />}
            {mostrarSidebar && (
                <Topbar
                    usuario={usuario}
                    fotoPerfil={fotoPerfil}
                    cambiarPagina={cambiarPagina}
                />
            )}

            <div className={mostrarSidebar ? "contenido-con-sidebar" : ""}>
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
                                // Cada cliente ve solo sus propios tickets
                                tickets={tickets.filter((ticket) => ticket.dueño === usuario)}
                                eliminarTicket={eliminarTicket}
                                cambiarPagina={cambiarPagina}
                            />
                        }
                    />
                    <Route
                        path="/soporte"
                        element={
                            // Si no es soporte, vuelve al login
                            esSoporte ? (
                                <PaginaInicialSoporte
                                    tickets={tickets}
                                    actualizarTicket={actualizarTicket}
                                    registrarHistorial={registrarHistorial}
                                    cambiarPagina={cambiarPagina}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/historial"
                        element={
                            // Solo soporte puede ver el historial
                            esSoporte ? (
                                <HistorialSoporte
                                    historial={historial}
                                    tickets={tickets}
                                    cambiarPagina={cambiarPagina}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/calendario"
                        element={<Calendario />}
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
                                fotoPerfil={fotoPerfil}
                                setFotoPerfil={setFotoPerfil}
                                cambiarPagina={cambiarPagina}
                                cerrarSesion={cerrarSesion}
                            />
                        }
                    />
                </Routes>
            </div>
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