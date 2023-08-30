import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils";

function Directores() {
    const [listaDirectores, setListaDirectores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [iddirector, setIddirector] = useState("");
    const [nombres, setNombres] = useState("");
    const [peliculas, setPeliculas] = useState("");

    //useState y useEffect son hooks
    useEffect(() => {
        leerServicio();
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "directores.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                setListaDirectores(data);
                setCargando(false);
            })
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Director</th>
                        <th>Películas</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaDirectores.map(item =>
                        <tr key={item.iddirector}>
                            <td>{item.iddirector}</td>
                            <td>{item.nombres}</td>
                            <td>{item.peliculas}</td>
                            <td><i className="bi bi-pencil"
                                data-bs-toggle="modal" data-bs-target="#updateModal"
                                onClick={() => llenarCampos(item)}></i></td>
                            <td><i className="bi bi-x-lg"
                                data-bs-toggle="modal" data-bs-target="#deleteModal"
                                onClick={() => llenarCampos(item)}></i></td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    const llenarCampos = (item) => {
        setIddirector(item.iddirector);
        setNombres(item.nombres);
        setPeliculas(item.peliculas);
    }

    const dibujarPrecarga = () => {
        return (
            <div className="lds-dual-ring"></div>
        )
    }

    const insertDirector = (event) => {
        event.preventDefault();

        const rutaServicio = ApiWebURL + "directoresinsert.php";

        let formData = new FormData();
        formData.append("nombres", nombres);
        formData.append("peliculas", peliculas);

        document.querySelector("#insertModal .btn-close").click();

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                setCargando(true);
                leerServicio();
                setNombres("");
                setPeliculas("");
            })
    }

    const dibujarInsertModal = () => {
        return (
            <div className="modal fade" id="insertModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo director</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => insertDirector(event)}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Nombre del director"
                                        value={nombres} onChange={(event) => setNombres(event.target.value)}
                                        required minLength="4" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Películas"
                                        value={peliculas} onChange={(event) => setPeliculas(event.target.value)}
                                        required minLength="1" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Agregar director</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    const updateDirector = (event) => {
        event.preventDefault()
        const rutaServicio = ApiWebURL + "directoresupdate.php";

        let formData = new FormData();
        formData.append("iddirector", iddirector);
        formData.append("nombres", nombres);
        formData.append("peliculas", peliculas);

        document.querySelector("#updateModal .btn-close").click();

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(() => {
                setCargando(true);
                leerServicio();
                setNombres("");
                setPeliculas("");
            })
    }

    const dibujarUpdateModal = () => {
        return (
            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Actualizar director</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => updateDirector(event)}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input type="text" className="form-control"
                                        value={iddirector} readOnly />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Nombre del director"
                                        value={nombres} onChange={(event) => setNombres(event.target.value)}
                                        required minLength="4" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Películas"
                                        value={peliculas} onChange={(event) => setPeliculas(event.target.value)}
                                        required minLength="1" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    const deleteDirector = (event) => {
        event.preventDefault()
        const rutaServicio = ApiWebURL + "directoresdelete.php";

        let formData = new FormData();
        formData.append("iddirector", iddirector);

        document.querySelector("#deleteModal .btn-close").click();

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(() => {
                setCargando(true);
                leerServicio();
                setNombres("");
                setPeliculas("");
            })
    }

    const dibujarDeleteModal = () => {
        return (
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Eliminar director</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => deleteDirector(event)}>
                            <div className="modal-body">
                                ¿Está seguro que desea eliminar al director {nombres}?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Eliminar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }




    return (
        <section className="padded">
            <div className="container">
                <h2>Directores</h2>
                <div className="mb-3">
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#insertModal">
                        Nuevo director
                    </button>
                </div>
                {cargando === true
                    ? dibujarPrecarga()
                    : dibujarTabla()}
                {dibujarInsertModal()}
                {dibujarUpdateModal()}
                {dibujarDeleteModal()}
            </div>
        </section>
    )
}

export default Directores