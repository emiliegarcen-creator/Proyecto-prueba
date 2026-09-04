import { useState, useEffect } from "react";
import Registro from "./Registro/Registro";
import InicioSesion from "./Inicio de sesión/iniciodesesion";
import PaginaInicialCliente from "./Pagina inicial/paginainicialcliente"
import CrearTicket from "./Crear ticket/CrearTicket";
import TicketMantenimiento from "./Ticket Mantenimiento/TicketMantenimiento";
import Perfil from "./Perfil/Perfil";


function App() {
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState("");
    const [pagina, setPagina] = useState("login");
    const [tickets, setTickets] = useState([]);
    const [usuariosRegistrados, setUsuariosRegistrados] = useState([]);


    // Cambiar el título de la página según la página actual


    useEffect(() => {


        console.log("PÁGINA ACTUAL:", pagina);


        if (pagina === "login") {
            document.title = "Iniciar sesión";


        } else if (pagina === "registro") {
            document.title = "Registro";


        } else if (pagina === "inicio") {
            document.title = "Página principal";


        } else if (pagina === "crear-ticket") {
            document.title = "Crear ticket";


        } else if (pagina === "mantenimiento") {
            document.title = "Ticket de mantenimiento";


        } else if (pagina === "perfil") {
            document.title = "Perfil";


        }


    }, [pagina]);
    // Cambiar de página


    const cambiarPagina = (nuevaPagina) => {
        console.log("CAMBIANDO PÁGINA A:", nuevaPagina);
        setPagina(nuevaPagina);
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


            {pagina === "login" && (


                <InicioSesion
                    iniciarSesion={iniciarSesion}
                    cambiarPagina={cambiarPagina}
                />


            )}




            {pagina === "registro" && (


                <Registro
                    agregarUsuario={agregarUsuario}
                    cambiarPagina={cambiarPagina}
                />


            )}




            {pagina === "inicio" && (


                <PaginaInicialCliente
                    usuario={usuario}
                    tickets={tickets}
                    eliminarTicket={eliminarTicket}
                    cambiarPagina={cambiarPagina}
                />


            )}




            {pagina === "crear-ticket" && (


                <CrearTicket
                    agregarTicket={agregarTicket}
                    cambiarPagina={cambiarPagina}
                />


            )}




            {pagina === "mantenimiento" && (


                <TicketMantenimiento
                    agregarTicket={agregarTicket}
                    cambiarPagina={cambiarPagina}
                />


            )}




            {pagina === "perfil" && (


                <Perfil
                    usuario={usuario}
                    email={email}
                    rol={rol}
                    cambiarPagina={cambiarPagina}
                    cerrarSesion={cerrarSesion}


                />


            )}


        </div>


    );


}


export default App;