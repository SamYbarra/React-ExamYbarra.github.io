import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils";

function Proveedores() {
    const [listaProveedores, setListaProveedores] = useState([]);
    const [listaProveedoresFiltrado, setListaProveedoresFiltrado] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [textoBuscar, setTextoBuscar] = useState("");
    const [columnaSeleccionada, setColumnaSeleccionada] = useState("Empresa");
    const [colSeleccionada, setColSeleccionada] = useState("nombreempresa");
    const [pagina, setPagina] = useState(0);
    const [filasPagina] = useState(5);
    const [numeroPaginas, setNumeroPaginas] = useState(0);

    //useState y useEffect son hooks
    useEffect(() => {
        leerServicio();
    }, [])

    const leerServicio = async () => {
        const rutaServicio = ApiWebURL + "servicioproveedores.php";
        /* 
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setListaProveedores(data);
                setCargando(false);
            })
        */
        const response = await fetch(rutaServicio);
        const data = await response.json();
        console.log(data);
        setListaProveedores(data);
        setListaProveedoresFiltrado(data);
        setNumeroPaginas(Math.ceil(data.length / filasPagina))
        setCargando(false);
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th columna="idproveedor" onClick={(event) => seleccionarColumna(event)}>Código</th>
                        <th columna="nombreempresa" onClick={(event) => seleccionarColumna(event)}>Empresa</th>
                        <th columna="nombrecontacto" onClick={(event) => seleccionarColumna(event)}>Contacto</th>
                        <th columna="cargocontacto" onClick={(event) => seleccionarColumna(event)}>Cargo</th>
                        <th columna="ciudad" onClick={(event) => seleccionarColumna(event)}>Ciudad</th>
                        <th columna="pais" onClick={(event) => seleccionarColumna(event)}>País</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProveedoresFiltrado.slice(pagina * filasPagina, (pagina + 1) * filasPagina).map(item =>
                        <tr key={item.idproveedor}>
                            <td>{item.idproveedor}</td>
                            <td>{item.nombreempresa}</td>
                            <td>{item.nombrecontacto}</td>
                            <td>{item.cargocontacto}</td>
                            <td>{item.ciudad}</td>
                            <td>{item.pais}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    const seleccionarColumna = (event) => {
        setColumnaSeleccionada(event.target.innerText);
        setColSeleccionada(event.target.getAttribute("columna"))
    }

    const buscarTexto = (texto) => {
        setTextoBuscar(texto);
        const resultado = listaProveedores.filter(item =>
            item[colSeleccionada].toUpperCase().includes(texto.toUpperCase())
        )
        setNumeroPaginas(Math.ceil(resultado.length / filasPagina))
        setListaProveedoresFiltrado(resultado);
    }

    const dibujarPrecarga = () => {
        return (
            <div className="lds-dual-ring"></div>
        )
    }

    const dibujarNumerosPaginacion = () => {
        return(
            <>
                
            </>
        )
    }


    const dibujarPaginacion = () => {
        return (
            <>
            <div>{(pagina + 1) + " de " + numeroPaginas}</div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#" onClick={() => retroceder()}>Retroceder</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#" onClick={() => avanzar()}>Avanzar</a></li>
                </ul>
            </nav>
            </>
        )
    }

    const retroceder = () => {
        if (pagina > 0) {
            setPagina(pagina - 1);
        }
    }
    const avanzar = () => {
        if (pagina < numeroPaginas - 1) {
            setPagina(pagina + 1);
        }
    }

    return (
        <section className="padded">
            <div className="container">
                <h2>Proveedores</h2>
                <div className="mb-3">
                    <label className="form-label">Buscar por <strong>{columnaSeleccionada}</strong></label>
                    <input type="text" className="form-control" placeholder="Indique expresión a buscar"
                        value={textoBuscar} onChange={(event) => buscarTexto(event.target.value)} />
                </div>
                {cargando === true
                    ? dibujarPrecarga()
                    : dibujarTabla()}
                {dibujarPaginacion()}
            </div>
        </section>
    )
}

export default Proveedores