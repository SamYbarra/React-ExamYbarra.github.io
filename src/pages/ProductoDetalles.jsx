import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ApiWebURL, agregarCarrito } from "../utils";
import noImage from "./../assets/images/no-image.svg";

function ProductoDetalles() {
    const [productoSeleccionado, setProductoSeleccionado] = useState([]);
    const [cantidad, setCantidad] = useState(0);

    let params = useParams();
    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        leerProductoSeleccionado();
        // eslint-disable-next-line react/prop-types
    }, [])

    const leerProductoSeleccionado = () => {
        const rutaServicio = ApiWebURL + "productos.php?idproducto=" + params.idproducto;
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                setProductoSeleccionado(data[0]);
            })
    }

    return (
        <section className="padded">
            <div className="container">
                <h2>{productoSeleccionado.nombre}</h2>
                <div className="row">
                    <div className="col-md-6">
                        <img src={productoSeleccionado.imagengrande === null
                            ? noImage
                            : ApiWebURL + productoSeleccionado.imagengrande
                        } className="card-img-top" alt="..." />
                    </div>
                    <div className="col-md-6">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Detalle</th>
                                    <td>{productoSeleccionado.detalle}</td>
                                </tr>
                                <tr>
                                    <th>Precio</th>
                                    <td>
                                        S/
                                        {productoSeleccionado.preciorebajado === "0"
                                            ? parseFloat(productoSeleccionado.precio).toFixed(2)
                                            : parseFloat(productoSeleccionado.preciorebajado).toFixed(2)
                                        }
                                        <span className="precio-lista">
                                            {productoSeleccionado.preciorebajado === "0"
                                                ? ""
                                                : "(S/ " + parseFloat(productoSeleccionado.precio).toFixed(2) + ")"
                                            }
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Categoría</th>
                                    <td>{productoSeleccionado.categoria}</td>
                                </tr>
                                <tr>
                                    <th>Proveedor</th>
                                    <td>{productoSeleccionado.proveedor}</td>
                                </tr>
                                <tr>
                                    <th>País</th>
                                    <td>{productoSeleccionado.pais}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <input type="number" className="form-control" min="1"
                            value={cantidad} onChange={(event) => setCantidad(event.target.value)}/>
                        <button className="btn btn-primary" onClick={() => agregarCarrito(productoSeleccionado, cantidad)}>
                            Agregar al carrito
                        </button>

                        <h3>Descripción</h3>
                        <div dangerouslySetInnerHTML={{__html: productoSeleccionado.descripcion}}></div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductoDetalles