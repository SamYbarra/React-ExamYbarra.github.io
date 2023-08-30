import "../components/Productos.css";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils";
import noImage from "./../assets/images/no-image.svg";

function PedidoDetalles() {
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState([]);

    let params = useParams();
    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        leerPedidoSeleccionado();
        // eslint-disable-next-line react/prop-types
    }, [])

    const leerPedidoSeleccionado = () => {
        const rutaServicio = ApiWebURL + "pedidosdetalle.php?idpedido=" + params.idpedido;
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                setPedidoSeleccionado(data);
            })
    }

    const dibujarCuadricula = () => {
        return (
            <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-2 g-4">

                {pedidoSeleccionado.map((item, index) =>
                    <div className="col" key={index}>
                        <div className="card text-center">
                            <figure className="image-content">
                                <img src={item.imagenchica === null
                                    ? noImage
                                    : ApiWebURL + item.imagenchica
                                } className="card-img-top" alt="..." />
                            </figure>
                            <div className="card-body">
                                <h5 className="card-title text-center">{item.nombre}</h5>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id producto:</th>
                                        <td>{item.idproducto}</td>
                                    </tr>
                                    <tr>
                                        <th>Precio:</th>
                                        <td>{item.precio}</td>
                                    </tr>
                                    <tr>
                                        <th>Cantidad</th>
                                        <td>{item.cantidad}</td>
                                    </tr>
                                    <th>Detalle:</th>
                                    <td>{item.detalle}</td>
                                </thead>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <section className="padded">
            <div className="container">
                <h2>Contenido del pedido seleccionado:</h2>
                {dibujarCuadricula()}
            </div>
        </section>
    )
}

export default PedidoDetalles