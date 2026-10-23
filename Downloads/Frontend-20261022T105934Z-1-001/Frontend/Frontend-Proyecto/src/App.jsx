import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Registro from "./Pagina de Cliente/Registro/Registro";
import InicioSesion from "./Pagina de Cliente/Inicio de sesión/iniciodesesion";
import PaginaInicialCliente from "./Pagina de Cliente/Pagina inicial/paginainicialcliente";
import CrearTicket from "./Pagina de Cliente/Crear ticket/CrearTicket";
import TicketMantenimiento from "./Pagina de Cliente/Ticket Mantenimiento/TicketMantenimiento";
import Perfil from "./Pagina de Cliente/Perfil/Perfil";
import Calendario from "./Pagina de Cliente/CalendarioCliente/CalendarioCliente";
import Sidebar from "./Pagina de Cliente/Sidebar/Sidebar";
import Topbar from "./Pagina de Cliente/Topbar/Topbar";

const API_URL = import.meta.env.VITE_API_URL ?? "";

function TituloPagina() {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/" || location.pathname === "/login") {
            document.title = "Iniciar sesión";
        } else if (location.pathname === "/registro") {
            document.title = "Registro";
        } else if (location.pathname === "/inicio") {
            document.title = "Página principal";
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

function AppContenido() {
    const navigate = useNavigate();
    const location = useLocation();

    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState("");
    const [ciUsuario, setCiUsuario] = useState(null);

    const rutasSinSidebar = ["/", "/login", "/registro"];
    const mostrarSidebar = !rutasSinSidebar.includes(location.pathname);

    const cambiarPagina = (nuevaPagina) => {
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

    const iniciarSesion = async (nombreUsuario, password) => {
        try {
            const respuesta = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombreUsuario, contrasena: password })
            });

            const data = await respuesta.json();

            if (!respuesta.ok) {
                alert(data.error || "Datos inválidos, por favor intente nuevamente");
                return;
            }

            setUsuario(data.usuario.nombre);
            setEmail(data.usuario.mail);
            setRol(data.usuario.rol);
            setCiUsuario(data.usuario.ci);

            cambiarPagina("inicio");
        } catch (error) {
            console.error("Error conectando con el servidor:", error);
            alert("No se pudo conectar con el servidor.");
        }
    };

    const cerrarSesion = () => {
        setUsuario("");
        setEmail("");
        setRol("");
        setCiUsuario(null);
        cambiarPagina("login");
    };

    return (
        <div>
            <TituloPagina />

            {mostrarSidebar && <Sidebar cambiarPagina={cambiarPagina} />}
            {mostrarSidebar && <Topbar usuario={usuario} cambiarPagina={cambiarPagina} />}

            <div className={mostrarSidebar ? "contenido-con-sidebar" : ""}>
                <Routes>
                    <Route
                        path="/"
                        element={<InicioSesion iniciarSesion={iniciarSesion} cambiarPagina={cambiarPagina} />}
                    />
                    <Route
                        path="/login"
                        element={<InicioSesion iniciarSesion={iniciarSesion} cambiarPagina={cambiarPagina} />}
                    />
                    <Route
                        path="/registro"
                        element={<Registro cambiarPagina={cambiarPagina} />}
                    />
                    <Route
                        path="/inicio"
                        element={<PaginaInicialCliente ciUsuario={ciUsuario} cambiarPagina={cambiarPagina} />}
                    />
                    <Route path="/calendario" element={<Calendario />} />
                    <Route
                        path="/crear-ticket"
                        element={<CrearTicket ciUsuario={ciUsuario} cambiarPagina={cambiarPagina} />}
                    />
                    <Route
                        path="/mantenimiento"
                        element={<TicketMantenimiento cambiarPagina={cambiarPagina} />}
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
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppContenido />
        </BrowserRouter>
    );
}