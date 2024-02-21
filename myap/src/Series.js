import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const Series = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3002/api/series/")
            .then(res => {
                setData(res.data.data)
            })
    }, [])

    const deleteSerie = id => {
        axios.delete("http://localhost:3002/api/series/" + id)
            .then(res => {
                const filtro = data.filter(item => item.id !== id)
                setData(filtro)
            })
    }

    const renderizaLinha = record => { //renderiza com o map, para um vetor que tem TR
        return (
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className="btn btn-danger" onClick={() => deleteSerie(record.id)}>
                        Remover
                    </button>
                    <Link to={"/series/" + record.id} className='btn btn-warning'>Info</Link>
                </td>
            </tr>
        )
    }
    // eslint-disable-next-line
    if (data.length === 0) {
        return (
            <div className='container'>
                <h1>Séries</h1>
                <div> <Link to="/series/novo" className="btn btn-primary">Novo Séries  </Link></div>
                <div className="alert alert-warning" role="alet">
                    Você não possui séries criadas.
                </div>
            </div>
        )
    }

    return (
        <div className="container">

            <h1>Séries</h1>
            <div> <Link to="/series/novo" className="btn btn-primary">Novo Séries  </Link></div>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderizaLinha)}
                </tbody>
            </table>
        </div>


    )


}

export default Series;