import { useEffect, useState } from "react"
import { ApiWebURL, verDetallePedido } from "../utils/indexpedido";
import { Link } from "react-router-dom";

function Pedidos() {
    const [listaPedidos, setListaPedidos] = useState([]);
    //useState y useEffect son hooks
    useEffect(() => {
        leerServicio();
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "pedidos.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                setListaPedidos(data);
            })
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Fecha y Hora</th>
                        <th>Nombre y Apellido</th>
                        <th>Usuario</th>
                        <th>Total</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPedidos.map(item =>
                        <tr key={item.idpedido}>
                            <td>{item.idpedido}</td>
                            <td>{item.fechapedido}</td>
                            <td>{item.nombres}</td>
                            <td>{item.usuario}</td>
                            <td>{item.total}</td>
                            <td>
                                <Link to={"/detallepedidos/" + item.idpedido}>
                                    <i className="bi bi-eye"></i>
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    return (
        <section className="padded">
            <div className="container">
                <h2> Tabla de Pedidos</h2>
                {dibujarTabla()}
            </div>
        </section>
    )
}

export default Pedidos